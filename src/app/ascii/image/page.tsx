"use client";
import styles from "./page.module.css";
import useLoadTime from "@/hooks/useLoadTime";
import React, {useEffect, useState} from "react";
import ImageUploader from "@/components/ImageUploader/ImageUploader";
import Fieldset from "@/components/Fieldset/Fieldset";
import Status from "@/components/Status/Status";


export default function BuildAsciiImage() {
  const {time, incrementLoadCount} = useLoadTime(3);
  const [imageFile, setImageFile] = useState<File | null>(null); // 업로드한 이미지
  const [isUploadError, setIsUploadError] = useState(false); // 이미지 업로드 에러 여부
  const [conversionCompleted, setConversionCompleted] = useState(false); // image to ascii 완료 상태
  
  
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
      <div className={styles.image}>
        {/* image */}
        <Fieldset title={'Image'} flex={7}>
          <ImageUploader
            imageFile={imageFile}
            setIsUploadError={setIsUploadError}
            setImageFile={setImageFile}
            onLoad={incrementLoadCount}
          />
        </Fieldset>
        {/* status */}
        <Fieldset title={'Status'} flex={3}>
          <Status
            onLoad={incrementLoadCount}
            file={imageFile || undefined}
            status={[
              {key: 'Image Uploaded', value: '', status: !imageFile ? 'processing' : isUploadError ? 'failed' : 'success'},
              {key: 'Ready for Conversion', value: '', status: isUploadError ? 'failed' : imageFile ? 'success' : 'processing'},
              {key: 'Conversion Complete?', value: '', status: conversionCompleted ? 'success' : 'processing'},
            ]}
          />
        </Fieldset>
      </div>

      {/* Ascii Art */}
      <div className={styles.asciiArt}>
        <Fieldset title="ASCII Art">
          <>TEST</>
        </Fieldset>
      </div>

      {/* function buttons */}
      <div className={styles.functions}>
        func buttons
        <button onClick={() => reset()}>reset</button>
      </div>
    </div>
  );
}
