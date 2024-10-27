"use client";
import styles from "./AsciiArt.module.css";
import {CSSProperties, RefObject, useEffect} from "react";
import BinaryData from "../../assets/binary-data.svg";
import {IOptions} from "@/modules/ascii/options";


interface IAsciiArt {
  asciiRef: RefObject<HTMLPreElement>;
  type: 'text' | 'image';
  conversionCompleted: boolean;
  onLoad?: () => void;
  options: IOptions;
  editMode: boolean;
}

const AsciiArt = ({asciiRef, type, conversionCompleted, onLoad, options, editMode}: IAsciiArt) => {

  const inlineStyle: CSSProperties = {
    width: "100%",
    whiteSpace: "pre",
    lineHeight: `${options.lineHeight}`,
    fontSize: `${options.fontSize * 0.1}rem`,
    letterSpacing: type == 'text' ? "unset" : `${options.letterSpacing * 0.1}rem`,
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

export default AsciiArt;
