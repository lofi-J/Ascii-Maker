"use client";
import styles from "./ImageUploader.module.css";
import React, {ChangeEvent, Dispatch, SetStateAction, useEffect, useRef, useState} from "react";
import Image from "next/image";
import Photo from "../../assets/photo.svg";


interface ImageUploader {
  imageFile: File | null;
  setIsUploadError: Dispatch<SetStateAction<boolean>>;
  setImageFile: Dispatch<SetStateAction<File | null>>;
  onLoad: () => void;
}

const ImageUploader = ({imageFile, setIsUploadError, setImageFile, onLoad}: ImageUploader) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [imageDataUrl, setImageDataUrl] = useState<string | null>(null); // 업로드한 이미지 data url

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    try {
      if (event.target.files === null) {
        setIsUploadError(true);
        return;
      }
      const file = event.target.files[0];

      if (!file) {
        console.error('has no file');
        return;
      }

      // 부모 측 File 전달
      setImageFile(file);
      // FileReader 생성
      const reader = new FileReader();

      // 읽기 실패 시 에러 핸들링
      reader.onerror = () => {
        console.error('File reading has failed');
        setIsUploadError(true);
      }

      // 파일 읽기
      reader.onloadend = () => {
        setImageDataUrl(reader.result as string);
      }
      // DataURL 형식으로 읽기
      reader.readAsDataURL(file);

    } catch (error) {
      console.error(error);
      setIsUploadError(true);
    }
  }

  // 렌더링 시간 계산
  useEffect(() => {
    onLoad();
  }, [onLoad])

  // reset 된경우 모두 초기화
  useEffect(() => {
    if (imageFile === null) {
      setImageDataUrl(null);
      if (inputRef.current) {
        inputRef.current.value = ''; // input onChange 트리거를 위해 초기화해준다.
      }
    }
  }, [imageFile]);

  return (
    <div className={styles.uploader}>
      {!imageFile && (
        <div className={styles.support}>
          <Photo className={styles.svg} />
          <strong className={styles.supportText}>Drag and Drop file or Choose file</strong>
        </div>
      )}
      {imageDataUrl && (
        <Image
          className={styles.image}
          src={imageDataUrl}
          alt="Confirmed Image"
          width={400}
          height={300}
        />
      )}
      <input ref={inputRef} className={styles.input} type="file" accept="image/*" onChange={handleImageUpload}/>
    </div>
  );
}

export default ImageUploader;
