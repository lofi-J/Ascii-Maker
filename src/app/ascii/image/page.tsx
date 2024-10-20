"use client";
import styles from "./page.module.css";
import useLoadTime from "@/hooks/useLoadTime";
import ImgUpload from "@/components/ImgUpload/ImgUpload";
import {useEffect, useLayoutEffect, useState} from "react";


export default function BuildAsciiImage() {
  const {time, incrementLoadCount} = useLoadTime(2);
  const [uploadedImg, setUploadedImg] = useState<File | null>(null);

  useEffect(() => {
    incrementLoadCount();
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
        <ImgUpload
          setImageFile={setUploadedImg}
          onLoad={incrementLoadCount}
        />
      </div>

      {/* function buttons */}
      <div>func buttons</div>
    </div>
  );
}
