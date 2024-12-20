import {Dispatch, SetStateAction, useEffect, useRef, useState} from "react";
import styles from "./LoadAllFont.module.css";
import figlet from "figlet";
import {IOptions} from "@/modules/ascii/options";
import {FIGLET_FONTS} from "@/modules/figlet/font";
import {ASCII_TEXT_ALL_FONTS} from "@/static/AsciiText";


interface ILoadAllFont {
  options: IOptions;
  setOptions: Dispatch<SetStateAction<IOptions>>;
}
const LoadAllFont = ({options, setOptions}: ILoadAllFont) => {
  const [loadedCount, setLoadedCount] = useState(0);
  const previewRef = useRef<HTMLDivElement>(null);
  const [previewList, setPreviewList] = useState<{fontName: figlet.Fonts, preview: string}[]>([]); // 미리보기 폰트 상태


  const setFont = (font: figlet.Fonts) => {
    setOptions(prev => {
      return {
        ...prev,
        font: font
      }
    })
  }

  const loadFont = async (fontName: figlet.Fonts) => {
    try {
      const fontModule = await import(`figlet/importable-fonts/${fontName}.js`);
      figlet.parseFont(fontName, fontModule.default);

      figlet.text('sample', {font: fontName}, (err, data) => {
        if (err) {
          console.error("Failed to generate preview:", err);
          return;
        }
        setPreviewList(prev => [...prev, {fontName, preview: data || ''}]);
      });
    } catch (error) {
      console.error(`Failed to load font ${fontName}:`, error);
    } finally {
      setLoadedCount((count) => count + 1); // 로드된 폰트 개수 업데이트
    }
  }

  useEffect(() => {
    FIGLET_FONTS.forEach(font => loadFont(font.value));
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.titleWrap}>
        <pre className={styles.pre}>{ASCII_TEXT_ALL_FONTS}</pre>
        <div className={styles.progress}>Loaded : {loadedCount} of {FIGLET_FONTS.length}</div>
      </div>
      <div className={styles.previewListWrap}>
        <div className={styles.preview} ref={previewRef}>
          {previewList && previewList.map(({fontName, preview}, index) => (
            <div className={styles.card} key={`font-preview-${index}: ${fontName}`}>
              <pre className={styles.ascii} style={{fontSize: options.fontSize}}>
                {preview}
              </pre>
              <div className={styles.info}>
                <div className={styles.fontName}>Font Name: {fontName}</div>
                <button className={styles.btn} onClick={() => setFont(fontName)}>Use Font</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LoadAllFont;
