import styles from "./InputRange.module.css";
import {ChangeEvent, CSSProperties} from "react";


interface InputRangeProps {
  min: number;
  max: number;
  step: number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value: number;
}

const InputRange = ({value, step, min, max, onChange}: InputRangeProps) => {
  const currWidth = (value / (max - min) * 100) -3;

  const lineStyle: CSSProperties = {
    width: `${currWidth}%`,
  };

  return (
    <div className={styles.container}>
      <div className={styles.sliderRail} />
      <div className={styles.sliderFillTrack} style={lineStyle} />
      <input className={styles.inputRange} type="range" step={step} value={value} min={min} max={max} onChange={onChange} />
    </div>
  );
}

export default InputRange;
