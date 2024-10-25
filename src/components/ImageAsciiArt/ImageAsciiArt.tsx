"use client";
import styles from "./ImageAsciiArt.module.css";
import {CSSProperties, Dispatch, SetStateAction, useEffect} from "react";
import BinaryData from "../../assets/binary-data.svg";
import {IOptions} from "@/modules/ascii/options";


interface IImageAsciiArt {
  setComplete?: Dispatch<SetStateAction<boolean>>;
  onLoad?: () => void;
  options: IOptions;
  asciiArt: string | undefined;
}

const ImageAsciiArt = ({asciiArt, setComplete, onLoad, options}: IImageAsciiArt) => {
  

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
