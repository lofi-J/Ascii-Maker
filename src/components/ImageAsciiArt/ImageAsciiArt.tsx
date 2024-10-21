"use client";
import generateAsciiImage from "@/modules/ascii/imageToAscii";
import {CSSProperties, useEffect, useState} from "react";


interface IImageAsciiArt {
  file: File | null;
}

const ImageAsciiArt = ({file}: IImageAsciiArt) => {
  const [asciiArt, setAsciiArt] = useState<string>();
  
  const inlineStyle: CSSProperties = {
    width: "100%",
    whiteSpace: "pre",
    lineHeight: "0.5",
    fontSize: "1rem"
  };
  
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
  
  return (
    <pre style={inlineStyle}>{asciiArt}</pre>
  );
}

export default ImageAsciiArt;
