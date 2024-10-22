"use client";
import styles from "./ImageAsciiArt.module.css";
import generateAsciiImage from "@/modules/ascii/imageToAscii";
import {CSSProperties, Dispatch, SetStateAction, useEffect, useState} from "react";
import BinaryData from "../../assets/binary-data.svg";


interface IImageAsciiArt {
  file: File | null;
  setComplete: Dispatch<SetStateAction<boolean>>;
  onLoad: () => void;
}

const ImageAsciiArt = ({file, setComplete, onLoad}: IImageAsciiArt) => {
  const [asciiArt, setAsciiArt] = useState<string>();
  
  const inlineStyle: CSSProperties = {
    width: "100%",
    whiteSpace: "pre",
    lineHeight: "0.5",
    fontSize: "1.1rem"
  };
  
  useEffect(() => {
    onLoad();
  }, [onLoad]);
  
  useEffect(() => {
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.src = e.target?.result as string;
      img.onload = () => {
        const ascii = generateAsciiImage(img);
        setAsciiArt(ascii || '');
      }
    }
    reader.readAsDataURL(file);
  }, [file]);
  
  useEffect(() => {
    if (asciiArt) {
      setComplete(true);
    }
  }, [asciiArt, setComplete]);
  
  return (
    <div className={styles.container}>
      {asciiArt ? (
        <pre style={inlineStyle}>{asciiArt}</pre>
      ) : (
        <BinaryData className={styles.icon} />
      )}
    </div>
  );
}

export default ImageAsciiArt;
