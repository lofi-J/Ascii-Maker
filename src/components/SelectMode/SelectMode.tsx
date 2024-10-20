"use client";
import styles from "./SelectMode.module.css";
import Link from "next/link";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";


const SelectMode = () => {
  const [mode, setMode] = useState(1);
  const router = useRouter();

  const getClassName = (_mode: 1 | 2) => {
    return mode === _mode ? styles.active : '';
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const upKey = ['ArrowUp', 'w', 'k'];
      const downKey = ['ArrowDown', 's', 'j'];

      if (event.key === 'Enter') {
        router.push(mode === 1 ? '/ascii/image' : '/ascii/text');
      }

      if (upKey.includes(event.key) && mode === 2) {
        setMode(1);
      } else if (downKey.includes(event.key) && mode === 1) {
        setMode(2);
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mode, router])

  return (
    <div className={styles.wrap}>
      <Link className={`${styles.linkImage} ${getClassName(1)}`} href={'/ascii/image'}>[1] Image to ASCII</Link>
      <Link className={`${styles.linkText} ${getClassName(2)}`} href={'/ascii/text'}>[2] Text to ASCII</Link>
    </div>
  );
}

export default SelectMode;
