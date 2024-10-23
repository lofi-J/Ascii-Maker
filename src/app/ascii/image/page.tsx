"use client";
import styles from "./page.module.css";
import useLoadTime from "@/hooks/useLoadTime";
import React, {useEffect, useState} from "react";
import ImageUploader from "@/components/ImageUploader/ImageUploader";
import Fieldset from "@/components/Fieldset/Fieldset";
import Status from "@/components/Status/Status";
import ImageAsciiArt from "@/components/ImageAsciiArt/ImageAsciiArt";
import TerminalStatus from "@/components/TerminalStatus/TerminalStatus";
import Options from "@/components/Options/Options";
import {defaultOptions} from "@/modules/ascii/options";


export interface IOptions {
  resolution: number;
  asciiChars: string;
  brightnessWeight: { red: number, green: number, blue: number };
  lineHeight: number;
  fontSize: number;
  letterSpacing: number;
}

export default function BuildAsciiImage() {
  const {time, incrementLoadCount} = useLoadTime(6);
  const [imageFile, setImageFile] = useState<File | null>(null); // 업로드한 이미지
  const [isUploadError, setIsUploadError] = useState(false); // 이미지 업로드 에러 여부
  const [conversionCompleted, setConversionCompleted] = useState(false); // image to ascii 완료 상태
  const [options, setOptions] = useState<IOptions>(defaultOptions);


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
        <TerminalStatus
          onLoad={incrementLoadCount}
          loadTime={time}
        />
      </div>

      {/* covert options */}
      <div className={styles.options}>
        <Fieldset title={'Options'} flex={1}>
          <Options
            onLoad={incrementLoadCount}
            options={options}
            setOptions={setOptions}
          />
        </Fieldset>
      </div>

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
          <ImageAsciiArt
            file={imageFile}
            setComplete={setConversionCompleted}
            onLoad={incrementLoadCount}
          />
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
