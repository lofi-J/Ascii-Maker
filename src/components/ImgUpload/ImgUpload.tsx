"use client";
import React, {ChangeEvent, useEffect, useState} from "react";
import styles from "./ImgUpload.module.css";
import Image from 'next/image';
import Fieldset from "@/components/Fieldset/Fieldset";


interface IImageUpload {
  setImageFile: React.Dispatch<React.SetStateAction<File | null>>;
  onLoad: () => void;
}

const ImgUpload = ({setImageFile, onLoad}: IImageUpload) => {
  const [isUploaded, setIsUploaded] = useState(false); // for css state
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
        setIsUploaded(true); // css flag state
      }
      reader.readAsDataURL(file);
    } else console.error('has no file');
  }

  useEffect(() => {
    onLoad();
  }, [onLoad])
  
  return (
    <div className={styles.container}>
      <Fieldset title={'Image Upload & Preview'}>
        <div className={styles.inner}>
          <div className={styles.imageWrap}>
            <input className={styles.input} type="file" accept="image/*" onChange={handleImageUpload}/>
            <div className={`${styles.support} ${isUploaded ? styles.displayNone : ''}`}>
              <div className={styles.supportText1}>UPLOAD IMAGE</div>
              <div className={styles.supportText2}>Drag and Drop file or Choose file</div>
            </div>
            {imageDataUrl && !isUploadError && (
              <div className={styles.uploadedImage}>
                <Image className={styles.image} src={imageDataUrl} alt="Confirmed Image" width={300} height={300}/>
              </div>
            )}
          </div>
          <div className={styles.asciiImage}>
            ASCII Image
          </div>
        </div>
      </Fieldset>
    </div>
  );
}

export default ImgUpload;
