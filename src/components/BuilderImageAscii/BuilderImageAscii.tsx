"use client";
import styles from "./BuilderImageAscii.module.css";
import generateAsciiImage from "@/modules/ascii/imageToAscii";
import {useEffect, useState} from "react";


interface IBuilderImageAscii {
  file: File | null;
}

const BuilderImageAscii = ({file}: IBuilderImageAscii) => {
  const [asciiArt, setAsciiArt] = useState<string>();
  const convertImageToAscii = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      if (typeof reader.result === 'string') {
        img.src = reader.result;
      }
      img.onload = () => {
        const ascii = generateAsciiImage(img);
        setAsciiArt(ascii);
      }
    }
    reader.readAsDataURL(file);
  }
  
  useEffect(() => {
    if (file) {
      convertImageToAscii(file);
    }
  }, [file]);
  
  return (
    <div className={styles.container}>
      {asciiArt && (
        <pre className={styles.asciiArt}>{asciiArt}</pre>
      )}
    </div>
  );
}

export default BuilderImageAscii;
