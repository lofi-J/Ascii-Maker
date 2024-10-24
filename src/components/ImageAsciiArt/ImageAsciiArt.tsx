"use client";
import styles from "./ImageAsciiArt.module.css";
import generateAsciiImage from "@/modules/ascii/imageToAscii";
import {CSSProperties, Dispatch, SetStateAction, useEffect, useState} from "react";
import BinaryData from "../../assets/binary-data.svg";
import {IOptions} from "@/modules/ascii/options";


interface IImageAsciiArt {
  file: File | null;
  setComplete?: Dispatch<SetStateAction<boolean>>;
  onLoad?: () => void;
  options: IOptions;
}

const ImageAsciiArt = ({file, setComplete, onLoad, options}: IImageAsciiArt) => {
  const [asciiArt, setAsciiArt] = useState<string>();
  
  const inlineStyle: CSSProperties = {
    width: "100%",
    whiteSpace: "pre",
    lineHeight: `${options.lineHeight}`,
    fontSize: `${options.fontSize * 0.1}rem`,
    letterSpacing: `${options.letterSpacing * 0.1}rem`,
  };
  
  useEffect(() => {
    if (onLoad) {
      onLoad();
    }
  }, [onLoad]);
  
  useEffect(() => {
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.src = e.target?.result as string;
      img.onload = () => {
        const ascii = generateAsciiImage(img, options);
        setAsciiArt(ascii || '');
      }
    }
    reader.readAsDataURL(file);
  }, [file, options]);
  
  useEffect(() => {
    if (asciiArt && setComplete) {
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
