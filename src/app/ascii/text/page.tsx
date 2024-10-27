"use client";
import styles from "./page.module.css";
import figlet from "figlet";
import TerminalStatus from "@/components/TerminalStatus/TerminalStatus";
import React, {ChangeEvent, useCallback, useRef, useState} from "react";
import useLoadTime from "@/hooks/useLoadTime";
import Fieldset from "@/components/Fieldset/Fieldset";
import {defaultOptions, IOptions} from "@/modules/ascii/options";
import AsciiTextOptions from "@/components/Options/AsciiTextOptions";
import AsciiArt from "@/components/AsciiArt/AsciiArt";
import Button from "@/components/Button/Button";
import copyClipboard from "@/modules/ascii/copyClipboard";


export default function BuildAsciiText() {
  const [text, setText] = useState(''); // 변환할 문자열
  const preRef = useRef<HTMLPreElement | null>(null);
  const {time, incrementLoadCount} = useLoadTime(0);
  const [options, setOptions] = useState<IOptions>(defaultOptions);
  const [conversionCompleted, setConversionCompleted] = useState(false); // 변환 완료 여부
  const [editMode, setEditMode] = useState(false);


  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  }
  // 폰트 프리뷰 +
  {/* TODO 텍스트 변환 기능 초기화 함수 완성 예정 reset */}
  const reset = () => {
    console.log('reset!!!')
  }

  const generateASCII = useCallback(async () => {
    const fontModule = await import(`figlet/importable-fonts/${options.font}.js`);
    figlet.parseFont(options.font, fontModule.default);

    if (fontModule && preRef.current) {
      figlet.text(text, { font: `${options.font}` }, (err, data) => {
        if (err) {
          console.error('Failed to generate ASCII:', err);
          return;
        } else if (preRef.current) {
          preRef.current.innerText = data || '';
          setConversionCompleted(true);
        }
      });
    }
  }, [options.font, text])


  return (
    <div className={styles.container}>
      {/* ready header */}
      <div className={styles.header}>
        <TerminalStatus
          type={'Text'}
          loadTime={time}
        />
      </div>

      {/* convert options */}
      <div className={styles.options}>
        <Fieldset title={'Options'} flex={1}>
          <AsciiTextOptions
            options={options}
            setOptions={setOptions}
            onLoad={incrementLoadCount}
          />
        </Fieldset>
      </div>

      {/* text input */}
      <div className={styles.inputText}>
        <Fieldset title={'Text'} flex={1}>
          <input
            className={styles.input}
            type={'text'}
            value={text}
            onChange={onChangeInput}
          />
        </Fieldset>
      </div>

      {/* Functions */}
      <div className={styles.functions}>
        <Fieldset title={'Function Buttons'} flex={1}>
          <div className={styles.btnWrap}>
            <Button
              text={'Generate ASCII Art'}
              onClick={generateASCII}
              disabled={!(text.length > 0)}
            />
            <Button
              text={'Clipboard Copy'}
              onClick={() => copyClipboard(preRef)}
              disabled={!conversionCompleted}
            />
            <Button
              text={'Edit Mode'}
              onClick={() => setEditMode(prev => !prev)}
              disabled={!conversionCompleted}
            />
            <Button
              text={'Reset All'}
              onClick={reset}
            />
          </div>
        </Fieldset>
      </div>

      {/* ASCII Text */}
      <div className={styles.asciiArt}>
        <Fieldset title={'ASCII Text'}>
          <AsciiArt
            asciiRef={preRef}
            type={'text'}
            conversionCompleted={conversionCompleted}
            editMode={editMode}
            onLoad={incrementLoadCount}
            options={options}
          />
        </Fieldset>
      </div>
    </div>
  );
}
