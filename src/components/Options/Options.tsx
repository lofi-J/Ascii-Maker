"use client";
import styles from "./Options.module.css";
import {ChangeEvent, Dispatch, SetStateAction, useEffect} from "react";
import {IOptions} from "@/app/ascii/image/page";
import InputRange from "@/components/InputRange/InputRange";
import SelectBox from "@/components/SelectBox/SelectBox";


interface IOptionsProps {
  onLoad: () => void;
  options: IOptions;
  setOptions: Dispatch<SetStateAction<IOptions>>;
}

interface IOption {
  options: IOptions;
  setOptions: Dispatch<SetStateAction<IOptions>>;
  optionName: string;
  optionKey: keyof IOptions;
  min?: number;
  max?: number;
}

const Option = ({options, optionName, setOptions, optionKey, min, max}: IOption) => {

  const onChangeOptions = (key: typeof optionKey, value: unknown) => {
    setOptions(prev => {
      return {...prev, [key]: value};
    });
  }

  return (
    <div className={styles.option}>
      <span className={styles.key}>{'>'} <b className={styles.yellow}>Set</b> <b className={styles.name}>{optionName}</b>:</span>
      <span className={styles.value}>
        {optionKey === "resolution" && (!!min && !!max) && (
          <>
            <span className={styles.text}>{options['resolution']}</span>
            <InputRange
              value={options['resolution']}
              min={10}
              max={300}
              step={5}
              onChange={(e: ChangeEvent<HTMLInputElement>) => onChangeOptions('resolution', parseInt((e.target as HTMLInputElement).value))}
            />
          </>
        )}
        {optionKey === "asciiChars" && (
          <>
            <span className={styles.row}>
              {'['}
              <input
                className={`${styles.input} ${styles.asciiChars}`}
                type="text"
                value={options['asciiChars']}
                onChange={e => onChangeOptions(optionKey, e.target.value)}
              />
              {']'}
            </span>
            <SelectBox />
          </>
        )}
      </span>
    </div>
  );
}

const Options = ({onLoad, options, setOptions}: IOptionsProps) => {
  console.log(options);

  useEffect(() => {
    onLoad();
  }, [onLoad]);

  return (
    <div className={styles.container}>
      <div className={styles.options}>
        <Option
          options={options}
          optionName={'Resolution'}
          setOptions={setOptions}
          optionKey={'resolution'}
          min={10} max={300}
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
        />
        <hr className={styles.hr} />
        <Option
          options={options}
          optionName={'Font size'}
          setOptions={setOptions}
          optionKey={'fontSize'}
        />
        <Option
          options={options}
          optionName={'Line height'}
          setOptions={setOptions}
          optionKey={'lineHeight'}
        />
      </div>
    </div>
  );
}

export default Options;
