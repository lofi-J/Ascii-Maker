"use client";
import styles from "./Options.module.css";
import {Dispatch, SetStateAction, useEffect} from "react";
import {IOptions} from "@/app/ascii/image/page";


interface IOptionsProps {
  onLoad: () => void;
  options: IOptions;
  setOptions: Dispatch<SetStateAction<IOptions>>;
}

interface IOption {
  optionName: string;
  valueType: "range" | "text";
}
const Option = ({optionName, valueType}: IOption) => {

  return (
    <div className={styles.option}>
      <span className={styles.key}>{'>'} <b className={styles.yellow}>Set</b> <b className={styles.name}>{optionName}</b>:</span>
      <span className={styles.value}>
        [<input
          className={styles.input}
          type={valueType}
        />]
      </span>
    </div>
  );
}

const Options = ({onLoad, options, setOptions}: IOptionsProps) => {
  
  useEffect(() => {
    onLoad();
  }, [onLoad]);
  
  return (
    <div className={styles.container}>
      <div className={styles.options}>
        <Option optionName={'Resolution'} valueType={"range"} />
        <Option optionName={'ASCII Characters'} valueType={"text"} />
        <Option optionName={'Brightness Weight'} valueType={"text"} />
        <hr className={styles.hr} />
        <Option optionName={'Font size'} valueType={"range"} />
        <Option optionName={'Line height'} valueType={"range"} />
      </div>
    </div>
  );
}

export default Options;
