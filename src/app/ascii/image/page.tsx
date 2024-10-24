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
import {defaultOptions, IOptions, IValidOptionsResult, validOptions} from "@/modules/ascii/options";


export default function BuildAsciiImage() {
  const {time, incrementLoadCount} = useLoadTime(6);
  const [imageFile, setImageFile] = useState<File | null>(null); // 업로드한 이미지
  const [isUploadError, setIsUploadError] = useState(false); // 이미지 업로드 에러 여부
  const [conversionCompleted, setConversionCompleted] = useState(false); // image to ascii 완료 상태
  const [options, setOptions] = useState<IOptions>(defaultOptions);
  const [optionsValid, setOptionsValid] = useState<IValidOptionsResult>({isPass: true, warringList: []}); // option 검사결과


  const reset = () => {
    setImageFile(null);
  }

  // option validation
  useEffect(() => {
    setOptionsValid(validOptions(options));
  }, [options]);

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
              {key: 'Option Integrity Check', status: optionsValid.isPass ? 'success' : 'failed'},
              {key: 'Image Uploaded', status: !imageFile ? 'processing' : isUploadError ? 'failed' : 'success'},
              {key: 'Ready for Conversion', status: isUploadError ? 'failed' : imageFile ? 'success' : 'processing'},
              {key: 'Conversion Complete?', status: conversionCompleted ? 'success' : 'processing'},
            ]}
            warringList={optionsValid.warringList}
          />
        </Fieldset>
      </div>

      {/* function buttons */}
      <div className={styles.functions}>
        <Fieldset title="Function Buttons">
          <button onClick={() => reset()}>reset</button>
          <button>option reset</button>
        </Fieldset>
      </div>

      {/* Ascii Art */}
      <div className={styles.asciiArt}>
        <Fieldset title="ASCII Art">
          <ImageAsciiArt
            file={imageFile}
            setComplete={setConversionCompleted}
            onLoad={incrementLoadCount}
            options={options}
          />
        </Fieldset>
      </div>
    </div>
  );
}
