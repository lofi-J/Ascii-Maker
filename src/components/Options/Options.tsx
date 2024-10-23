"use client";
import styles from "./Options.module.css";
import {ChangeEvent, Dispatch, SetStateAction, useEffect} from "react";
import {IOptions} from "@/app/ascii/image/page";
import InputRange from "@/components/InputRange/InputRange";
import SelectBox from "@/components/SelectBox/SelectBox";
import {asciiCharsPreset} from "@/modules/ascii/options";


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
  
  const onChangeAsciiChars = (event: ChangeEvent<HTMLInputElement>) => {
    if (options['asciiChars'].length <= 100 || options['asciiChars'].length > event.target.value.length) {
      onChangeOptions('asciiChars', event.target.value);
    }
  }
  const onChangeBrightnessWeight = (event: ChangeEvent<HTMLInputElement>, rgb: 'red' | 'green' | 'blue') => {
    onChangeOptions('brightnessWeight', {...options.brightnessWeight, [rgb]: Number(event.target.value)});
  }

  return (
    <div className={styles.option}>
      <span className={styles.key}>{'>'} <b className={styles.yellow}>Set</b> <b className={styles.name}>{optionName}</b>:</span>
      <span className={styles.value}>
        {optionKey === "resolution" && (!!min && !!max) && (
          <div className={styles.rowWrap}>
            <span className={styles.text}>{options['resolution']}</span>
            <InputRange
              value={options['resolution']}
              min={10}
              max={300}
              step={5}
              onChange={(e: ChangeEvent<HTMLInputElement>) => onChangeOptions('resolution', parseInt((e.target as HTMLInputElement).value))}
            />
          </div>
        )}
        {optionKey === "asciiChars" && (
          <div className={styles.rowWrap}>
            <span className={styles.row}>
              [<input
                className={`${styles.input} ${styles.asciiChars}`}
                type="text"
                value={options['asciiChars']}
                onChange={e => onChangeAsciiChars(e)}
              />]
            </span>
            <SelectBox
              title={'Presets'}
              optionList={asciiCharsPreset}
              onChange={(value: string) => onChangeOptions('asciiChars', value)}
            />
          </div>
        )}
        {optionKey === "brightnessWeight" && (
          <div className={styles.brightnessWeight}>
            <span className={styles.rgbWrap}>
              [<strong className={styles.rgb}>R</strong>
              <input
                className={styles.input}
                type="number"
                value={options['brightnessWeight'].red}
                onChange={(event) => onChangeBrightnessWeight(event, 'red')}
                min={0.1} max={1} step={0.1}
              />]
            </span>
            <span className={styles.rgbWrap}>
              [<strong className={styles.rgb}>G</strong>
              <input
                className={styles.input}
                type="number"
                value={options['brightnessWeight'].green}
                onChange={(event) => onChangeBrightnessWeight(event, 'green')}
                min={0.1} max={1} step={0.1}
              />]
            </span>
            <span className={styles.rgbWrap}>
              [<strong className={styles.rgb}>B</strong>
              <input
                className={styles.input}
                type="number"
                value={options['brightnessWeight'].blue}
                onChange={(event) => onChangeBrightnessWeight(event, 'blue')}
                min={0.1} max={1} step={0.1}
              />]
            </span>
          </div>
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
        <div className={styles.title}>ASCII Generation Options</div>
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
        <hr className={styles.hr}/>
        <div className={styles.title}>Visual Appearance Options</div>
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
