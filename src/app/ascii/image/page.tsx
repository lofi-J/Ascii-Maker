"use client";
import styles from "./page.module.css";
import useLoadTime from "@/hooks/useLoadTime";
import React, {useCallback, useEffect, useRef, useState} from "react";
import ImageUploader from "@/components/ImageUploader/ImageUploader";
import Fieldset from "@/components/Fieldset/Fieldset";
import Status from "@/components/Status/Status";
import TerminalStatus from "@/components/TerminalStatus/TerminalStatus";
import {defaultOptions, IOptions, IValidOptionsResult, validOptions} from "@/modules/ascii/options";
import Button from "@/components/Button/Button";
import generateAsciiImage from "@/modules/ascii/imageToAscii";
import downloadPNG from "@/modules/ascii/downloadPNG";
import AsciiImageOptions from "@/components/Options/AsciiImageOptions";
import AsciiArt from "@/components/AsciiArt/AsciiArt";


export default function BuildAsciiImage() {
  const {time, incrementLoadCount} = useLoadTime(5);
  const [imageFile, setImageFile] = useState<File | null>(null); // 업로드한 이미지
  const [isUploadError, setIsUploadError] = useState(false); // 이미지 업로드 에러 여부
  const [conversionCompleted, setConversionCompleted] = useState(false); // image to ascii 완료 상태
  const [options, setOptions] = useState<IOptions>(defaultOptions);
  const [optionsValid, setOptionsValid] = useState<IValidOptionsResult>({isPass: true, warringList: []}); // option 검사결과
  const asciiRef = useRef<HTMLPreElement>(null); // ASCII Art string
  const [editMode, setEditMode] = useState(false);


  const reset = () => {
    setImageFile(null);
    setOptions(defaultOptions);
    setConversionCompleted(false);
    setEditMode(false);
    if (asciiRef.current) {
      asciiRef.current.innerText = '';
    }
  }

  const copyClipboard = async () => {
    if (!asciiRef.current) return;
    try {
      await navigator.clipboard.writeText(asciiRef.current.innerText);
      alert("Copied to clipboard");
    } catch (error) {
      console.error(error);
    }
  }

  const generateASCII = useCallback(() => {
    if (!imageFile) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.src = e.target?.result as string;
      img.onload = () => {
        const ascii = generateAsciiImage(img, options);

        if (asciiRef.current) {
          asciiRef.current.innerText = ascii || '';
          if (ascii && ascii.length) {
            setConversionCompleted(true);
          }
        }
      }
    }
    reader.readAsDataURL(imageFile);
  }, [options, imageFile])

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
          type={'Image'}
          loadTime={time}
        />
      </div>

      {/* convert options */}
      <div className={styles.options}>
        <Fieldset title={'Options'} flex={1}>
          <AsciiImageOptions
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
          <div className={styles.btnWrap}>
            <Button
              text={'Generate ASCII Art'}
              onClick={generateASCII}
              disabled={(!optionsValid.isPass) || (!imageFile)}
            />
            <Button
              text={'Clipboard Copy'}
              onClick={copyClipboard}
              disabled={!conversionCompleted}
            />
            <Button
              text={'Edit Mode'}
              onClick={() => setEditMode(prev => !prev)}
              disabled={!conversionCompleted}
            />
            <Button
              text={'Export PNG'}
              onClick={() => downloadPNG(asciiRef, `ascii-${imageFile?.name}`)}
              disabled={!conversionCompleted}
            />
            <Button
              text={'Reset All'}
              onClick={reset}
            />
          </div>
        </Fieldset>
      </div>

      {/* Ascii Art */}
      <div className={styles.asciiArt}>
        <Fieldset title="ASCII Art">
          <AsciiArt
            type={'image'}
            asciiRef={asciiRef}
            conversionCompleted={conversionCompleted}
            onLoad={incrementLoadCount}
            options={options}
            editMode={editMode}
          />
        </Fieldset>
      </div>
    </div>
  );
}
