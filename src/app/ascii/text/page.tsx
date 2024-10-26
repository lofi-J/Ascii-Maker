"use client";
import styles from "./page.module.css";
import figlet from "figlet";
import Greek from "figlet/importable-fonts/NT Greek";
import TerminalStatus from "@/components/TerminalStatus/TerminalStatus";
import React, {ChangeEvent, useEffect, useRef, useState} from "react";
import useLoadTime from "@/hooks/useLoadTime";
import Fieldset from "@/components/Fieldset/Fieldset";
import {defaultOptions, IOptions} from "@/modules/ascii/options";
import AsciiTextOptions from "@/components/Options/AsciiTextOptions";


export default function BuildAsciiText() {
  const [text, setText] = useState('');
  const preRef = useRef<HTMLPreElement | null>(null);
  const {time, incrementLoadCount} = useLoadTime(0);
  const [options, setOptions] = useState<IOptions>(defaultOptions);

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  }

  // TODO 유저가 폰트를 설정할 수 있도록 해야함
  const generateASCII = async () => {
    // const fontModule = await import(`figlet/importable-fonts/${font}.js`); 동적으로 폰트 로드하기
    // 후 폰트 파싱해 사용하기
    if (preRef.current !== null) {
      figlet.text(text, { font: 'Greek' }, (err, data) => {
        if (err) {
          console.error('Failed to generate ASCII art:', err);
          return;
        }
        if (preRef.current) {
          preRef.current.innerText = data || '';
        }
      });
    }
  }

  // FIXME 삭제 예정
  // 수 많은 폰트들을 불러와야하는데 유저가 옵션을 선택하면 동적으로 import 해오도록 최적화할 필요가 있음.
  useEffect(() => {
    figlet.parseFont('Greek', Greek);
  }, [])


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
