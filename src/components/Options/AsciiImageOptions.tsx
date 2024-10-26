"use client";
import styles from "./Options.module.css";
import {Dispatch, SetStateAction, useEffect} from "react";
import Option from "./Option";
import {defaultOptions, IOptions, limitOptionValue as LOV} from "@/modules/ascii/options";
import Undo from "../../assets/undo.svg";


interface IOptionsProps {
  onLoad: () => void;
  options: IOptions;
  setOptions: Dispatch<SetStateAction<IOptions>>;
}

const AsciiImageOptions = ({onLoad, options, setOptions}: IOptionsProps) => {

  const optionReset = () => {
    setOptions(defaultOptions);
  }

  useEffect(() => {
    onLoad();
  }, [onLoad]);

  return (
    <div className={styles.container}>
      <div className={styles.options}>
        <div className={styles.optionHeader}>
          <div className={styles.title}>ASCII Generation Options</div>
          <button className={styles.optionReset} onClick={optionReset}>
            <Undo className={styles.resetSVG} />
          </button>
        </div>
        <Option
          options={options}
          optionName={'Resolution'}
          setOptions={setOptions}
          optionKey={'resolution'}
          min={LOV.resolution.min} max={LOV.resolution.max} step={10}
        />
        <Option
          options={options}
          optionName={'ASCII Characters'}
          setOptions={setOptions}
          optionKey={'asciiChars'}
        />
        <Option
          options={options}
          optionName={'Brightness Weight'}
          setOptions={setOptions}
          optionKey={'brightnessWeight'}
          min={LOV.brightnessWeight.min}
          max={LOV.brightnessWeight.max}
        />
        <hr className={styles.hr}/>
        <div className={styles.title}>Visual Appearance Options</div>
        <Option
          options={options}
          optionName={'Font size'}
          setOptions={setOptions}
          optionKey={'fontSize'}
          min={LOV.fontSize.min}
          max={LOV.fontSize.max}
          step={1}
        />
        <Option
          options={options}
          optionName={'Line height'}
          setOptions={setOptions}
          optionKey={'lineHeight'}
          min={LOV.lineHeight.min}
          max={LOV.lineHeight.max}
          step={0.1}
        />
        <Option
          options={options}
          optionName={'Letter spacing'}
          setOptions={setOptions}
          optionKey={'letterSpacing'}
          min={LOV.letterSpacing.min}
          max={LOV.letterSpacing.max}
          step={0.1}
        />
      </div>
    </div>
  );
}

export default AsciiImageOptions;
