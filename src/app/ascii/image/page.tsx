"use client";
import styles from "./page.module.css";
import useLoadTime from "@/hooks/useLoadTime";
import React, {useEffect, useState} from "react";
import ImageUploader from "@/components/ImageUploader/ImageUploader";
import Fieldset from "@/components/Fieldset/Fieldset";


export default function BuildAsciiImage() {
  const {time, incrementLoadCount} = useLoadTime(2);
  const [imageFile, setImageFile] = useState<File | null>(null); // 업로드한 이미지
  const [isUploadError, setIsUploadError] = useState(false); // 이미지 업로드 에러 여부

  const reset = () => {
    setImageFile(null);
  }

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

      {/* Image Upload And Status */}
      <div className={styles.imageAndAscii}>
        {/* image */}
        <Fieldset title={'Image'} flex={3}>
          <ImageUploader
            imageFile={imageFile}
            setIsUploadError={setIsUploadError}
            setImageFile={setImageFile}
            onLoad={incrementLoadCount}
          />
        </Fieldset>
        {/* status */}
        <Fieldset title={'Status'} flex={5}>
          <div style={{flex: "1"}}>
            jkl;
          </div>
        </Fieldset>
      </div>

      {/* Ascii Art */}


      {/* function buttons */}
      <div>
        func buttons
        <button onClick={() => reset()}>reset</button>
      </div>
    </div>
  );
}
