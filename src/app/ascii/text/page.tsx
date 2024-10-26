"use client";
import styles from "./page.module.css";
import figlet from "figlet";
import TerminalStatus from "@/components/TerminalStatus/TerminalStatus";
import React, {ChangeEvent, useCallback, useRef, useState} from "react";
import useLoadTime from "@/hooks/useLoadTime";
import Fieldset from "@/components/Fieldset/Fieldset";
import {defaultOptions, IOptions} from "@/modules/ascii/options";
import AsciiTextOptions from "@/components/Options/AsciiTextOptions";


export default function BuildAsciiText() {
  const [text, setText] = useState(''); // 변환할 문자열
  const preRef = useRef<HTMLPreElement | null>(null);
  const {time, incrementLoadCount} = useLoadTime(0);
  const [options, setOptions] = useState<IOptions>(defaultOptions);

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  }
  
  const generateASCII = useCallback(async () => {
    const fontModule = await import(`figlet/importable-fonts/${options.font}.js`);
    figlet.parseFont(options.font, fontModule.default);
    
    if (fontModule && preRef.current) {
      figlet.text(text, { font: `${options.font}` }, (err, data) => {
        if (err) {
          console.error('Failed to generate ASCII:', err);
          return;
        } else if (preRef.current) {
          preRef.current.innerText = data || '';
        }
      });
    }
  }, [options.font, text])
  

  return (
    <div className={styles.container}>
      {/* ready header */}
      <div className={styles.header}>
        <TerminalStatus
          type={'Text'}
          loadTime={time}
        />
      </div>

      {/* convert options */}
      <div className={styles.options}>
        <Fieldset title={'Options'} flex={1}>
          <AsciiTextOptions
            options={options}
            setOptions={setOptions}
            onLoad={incrementLoadCount}
          />
        </Fieldset>
      </div>
      
      {/* text input */}
      <input type={'text'} value={text} onChange={onChangeInput} />

      <button onClick={generateASCII}>Go!</button>

      {/* ASCII Text */}
      <div className={styles.asciiArt}>
        <Fieldset title={'ASCII Text'}>
          <pre
            ref={preRef}
            className={styles.pre}
          />
        </Fieldset>
      </div>
    </div>
  );
}
