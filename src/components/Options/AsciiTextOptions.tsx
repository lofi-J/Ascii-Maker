import styles from "./Options.module.css";
import {IOptions} from "@/modules/ascii/options";
import {Dispatch, SetStateAction, useEffect} from "react";


interface IAsciiTextOptions {
  onLoad: () => void;
  options: IOptions;
  setOptions: Dispatch<SetStateAction<IOptions>>;
}

const AsciiTextOptions = ({options, setOptions, onLoad}: IAsciiTextOptions) => {
  console.log(options, setOptions);
  
  
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
        </div>
        {/*<Option*/}
        {/*  options={options}*/}
        {/*  optionName={}*/}
        {/*/>*/}
      </div>
    </div>
  );
}

export default AsciiTextOptions;
