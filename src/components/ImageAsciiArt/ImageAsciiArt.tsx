"use client";
import styles from "./ImageAsciiArt.module.css";
import {CSSProperties, RefObject, useEffect} from "react";
import BinaryData from "../../assets/binary-data.svg";
import {IOptions} from "@/modules/ascii/options";


interface IImageAsciiArt {
  asciiRef: RefObject<HTMLPreElement>;
  conversionCompleted: boolean;
  onLoad?: () => void;
  options: IOptions;
  editMode: boolean;
}

const ImageAsciiArt = ({asciiRef, conversionCompleted, onLoad, options, editMode}: IImageAsciiArt) => {
  
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

  return (
    <div className={styles.container}>
      <pre
        ref={asciiRef}
        style={inlineStyle}
        className={styles.pre}
        contentEditable={editMode}
      />
      {!conversionCompleted && (<BinaryData className={styles.icon} />)}
    </div>
  );
}

export default ImageAsciiArt;
