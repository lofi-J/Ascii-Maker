"use client";
import styles from "./SelectMode.module.css";
import Link from "next/link";
import {useState} from "react";


const SelectMode = () => {
  const [mode, setMode] = useState(1);
  
  const getClassName = (_mode: 0 | 1) => {
    return mode === _mode ? styles.active : '';
  }
  
  return (
    <div className={styles.wrap}>
      <Link className={`${styles.link} ${getClassName(1)}`} href={'/select/image'}>[1] Image to ASCII</Link>
      <Link className={`${styles.link} ${getClassName(2)}`} href={'/select/text'}>[2] Text to ASCII</Link>
    </div>
  );
}

export default SelectMode;
