"use client";
import styles from "./page.module.css";
import useLoadTime from "@/hooks/useLoadTime";
import {useEffect} from "react";
import ImageAscii from "@/components/ImageAscii/ImageAscii";


export default function BuildAsciiImage() {
  const {time, incrementLoadCount} = useLoadTime(2);
  
  useEffect(() => {
    incrementLoadCount(); // component count
  }, [incrementLoadCount]);

  return (
    <div className={styles.container}>
      {/* ready header */}
      <div className={styles.header}>
        ASCII Art Maker <em className={styles.version}>v 1.0</em>
        <span className={styles.gray}>
          ready in
          <em className={styles.em}>{time !== null ? time === 0 ? 0.1 : time.toFixed(3) : '.'} ms</em>
        </span>
      </div>

      {/* covert options */}
      <div>options</div>

      {/* upload and preview */}
      <div className={styles.upload}>
        <ImageAscii
          onLoad={incrementLoadCount} // component count
        />
      </div>

      {/* function buttons */}
      <div>func buttons</div>
    </div>
  );
}
