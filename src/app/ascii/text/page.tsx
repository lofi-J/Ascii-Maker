"use client";
import styles from "./page.module.css";
import figlet from "figlet";
import TerminalStatus from "@/components/TerminalStatus/TerminalStatus";
import React, {ChangeEvent, useCallback, useRef, useState} from "react";
import useLoadTime from "@/hooks/useLoadTime";
import Fieldset from "@/components/Fieldset/Fieldset";
import {defaultOptions, IOptions} from "@/modules/ascii/options";
import AsciiTextOptions from "@/components/Options/AsciiTextOptions";
import AsciiArt from "@/components/AsciiArt/AsciiArt";
import Button from "@/components/Button/Button";
import copyClipboard from "@/modules/ascii/copyClipboard";
import LoadAllFont from "@/components/LoadAllFont/LoadAllFont";


export default function BuildAsciiText() {
  const [text, setText] = useState(''); // 변환할 문자열
  const preRef = useRef<HTMLPreElement | null>(null);
  const {time, incrementLoadCount} = useLoadTime(0);
  const [options, setOptions] = useState<IOptions>(defaultOptions);
  const [conversionCompleted, setConversionCompleted] = useState(false); // 변환 완료 여부
  const [editMode, setEditMode] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [isLoadAllFonts, setIsLoadAllFonts] = useState(false); // 모든 폰트 fetch 여부


  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    const isValid = /^[A-Za-z0-9 !@#$%^&*()_+={}\[\]:;'"\\|,.<>?~`-]*$/.test(inputValue);
    if (isValid) {
      setText(inputValue);
      if (showAlert) setShowAlert(false);
    } else {
      setShowAlert(true);
    }
  }

  const reset = () => {
    setText('');
    setEditMode(false);
    setOptions(defaultOptions);
    if (preRef.current) {
      preRef.current.innerText = '';
    }
  }

  const generateASCII = useCallback(async () => {
    const fontModule = await import(`figlet/importable-fonts/${options.font}.js`);
    figlet.parseFont(options.font, fontModule.default);

    if (fontModule && preRef.current) {
      figlet.text(text, { font: `${options.font}` }, (err, data) => {
        if (err) {
          if (preRef.current) {
            preRef.current.innerText = err.message;
          }
          return;
        } else if (preRef.current) {
          preRef.current.innerText = data || '';
          setConversionCompleted(true);
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
            setIsLoadAllFonts={setIsLoadAllFonts}
          />
        </Fieldset>
      </div>

      {/* text input */}
      <div className={styles.inputContainer}>
        <Fieldset title={'Text'} flex={1}>
          <div className={styles.inputWrap}>
            {showAlert && (
              <div className={styles.alert}>
                * Only English letters, numbers, and specific special characters are allowed.
              </div>
            )}
            <input
              className={styles.input}
              type={'text'}
              value={text}
              onChange={onChangeInput}
            />
          </div>
        </Fieldset>
      </div>

      {/* Functions */}
      <div className={styles.functions}>
        <Fieldset title={'Function Buttons'} flex={1}>
          <div className={styles.btnWrap}>
            <Button
              text={'Generate ASCII Art'}
              onClick={generateASCII}
              disabled={!(text.length > 0)}
            />
            <Button
              text={'Clipboard Copy'}
              onClick={() => copyClipboard(preRef)}
              disabled={!conversionCompleted}
            />
            <Button
              text={'Edit Mode'}
              onClick={() => setEditMode(prev => !prev)}
              disabled={!conversionCompleted}
            />
            <Button
              text={'Reset All'}
              onClick={reset}
            />
          </div>
        </Fieldset>
      </div>

      {/* ASCII Text */}
      <div className={styles.asciiArt}>
        <Fieldset title={'ASCII Text'}>
          <AsciiArt
            asciiRef={preRef}
            type={'text'}
            conversionCompleted={conversionCompleted}
            editMode={editMode}
            onLoad={incrementLoadCount}
            options={options}
          />
        </Fieldset>
      </div>

      {/* Load All Font */}
      {isLoadAllFonts && (
        <div className={styles.loadAllFont}>
          <LoadAllFont />
        </div>
      )}
    </div>
  );
}
