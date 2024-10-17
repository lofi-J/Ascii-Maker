"use client";
import React, {ChangeEvent, useState} from "react";
import styles from "./ImgUpload.module.css";
import Image from 'next/image';


interface IImageUpload {
  setImageFile: React.Dispatch<React.SetStateAction<File | null>>
}

const ImgUpload = ({setImageFile}: IImageUpload) => {
  const [imageDataUrl, setImageDataUrl] = useState<string | null>(null);
  const [isUploadError, setIsUploadError] = useState(false);

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

  return (
    <div className={styles.container}>
      <div className={styles.upload}>
        <input className={styles.input} type="file" accept="image/*" onChange={handleImageUpload} />
      </div>
      {imageDataUrl && !isUploadError && (
        <div className={styles.preview}>
          <Image src={imageDataUrl} alt="Confirmed Image" width={300} height={300} />
        </div>
      )}
    </div>
  );
}

export default ImgUpload;
