"use client";
import styles from "./Options.module.css";
import {Dispatch, SetStateAction, useEffect} from "react";
import Option from "./Option";
import {IOptions, limitOptionValue as LOV} from "@/modules/ascii/options";


interface IAsciiTextOptions {
  onLoad: () => void;
  options: IOptions;
  setOptions: Dispatch<SetStateAction<IOptions>>;
  setIsLoadAllFonts: Dispatch<SetStateAction<boolean>>;
}

const AsciiTextOptions = ({options, setOptions, onLoad, setIsLoadAllFonts}: IAsciiTextOptions) => {

  const onClickLoad = () => {
    setIsLoadAllFonts(true);
  }

  useEffect(() => {
    if (onLoad) {
      onLoad();
    }
  }, [onLoad]);

  return (
    <div className={styles.container}>
      <div className={styles.options}>
        <div className={styles.optionHeader}>
          <div className={styles.title}>ASCII Generation Options</div>
          <button onClick={onClickLoad} className={styles.loadBtn}>Load All Fonts</button>
        </div>
        <Option
          optionName={'Font'}
          options={options}
          optionKey={'font'}
          setOptions={setOptions}
        />
        <Option
          optionName={'Font size'}
          optionKey={'fontSize'}
          min={LOV.fontSize.min}
          max={LOV.fontSize.max}
          options={options}
          setOptions={setOptions}
        />
      </div>
    </div>
  );
}

export default AsciiTextOptions;
