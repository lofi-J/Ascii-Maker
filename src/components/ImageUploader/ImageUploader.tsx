"use client";
import styles from "./ImageUploader.module.css";
import React, {ChangeEvent, Dispatch, SetStateAction, useEffect, useState} from "react";
import Image from "next/image";
import { MdOutlineUploadFile } from "react-icons/md";



interface ImageUploader {
  imageFile: File | null;
  setIsUploadError: Dispatch<SetStateAction<boolean>>;
  setImageFile: Dispatch<SetStateAction<File | null>>;
  onLoad: () => void;
}

const ImageUploader = ({imageFile, setIsUploadError, setImageFile, onLoad}: ImageUploader) => {
  const [imageDataUrl, setImageDataUrl] = useState<string | null>(null); // 업로드한 이미지 data url

  // TODO file reader error 핸들링 필요 (try, catch | reader.onerror)
  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files === null) {
      setIsUploadError(true);
      return;
    }
    const file = event.target.files[0];
    if (file !== null) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageDataUrl(reader.result as string);
      }
      reader.readAsDataURL(file);
    } else console.error('has no file');
  }

  useEffect(() => {
    onLoad();
  }, [onLoad])

  return (
    <div className={styles.uploader}>
      {!imageFile && (
        <div className={styles.support}>
          <MdOutlineUploadFile size={35} />
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
      <input className={styles.input} type="file" accept="image/*" onChange={handleImageUpload}/>
    </div>
  );
}

export default ImageUploader;
