"use client";
import styles from "./SelectBox.module.css";
import {CSSProperties, useRef, useState} from "react";
import useOutsideClick from "@/hooks/useOutsideClick";
import Arrow from "../../assets/arrow.svg";


interface ISelectBox {
  optionList: {name: string; value: string}[];
  baseItem?: {name: string; value: string};
  onChange: (value: string) => void;
  height?: string;
}

const SelectBox = ({optionList, onChange, baseItem = optionList[0], height = 'auto'}: ISelectBox) => {
  const [localItem, setLocalItem] = useState(baseItem);
  const ref = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  useOutsideClick(ref, () => setIsOpen(false));
  
  const toggleDropDown = () => setIsOpen(prev => !prev);
  
  const handler = (option: {name: string, value: string}) => {
    onChange(option.value);
    setLocalItem(option);
    toggleDropDown();
  }
  
  const inLineStyle: CSSProperties = {
    height: height,
    borderRight: height === 'auto' ? '1px solid var(--color)' : 'unset'
  }
  const toggleStyle: CSSProperties = {
    transform: isOpen ? "rotate(-90deg)" : "rotate(90deg)",
  }
  
  return (
    <div className={styles.container} ref={ref}>
      <button
        className={styles.button}
        onClick={() => toggleDropDown()}
      >
        <span className={styles.name}>{localItem.name}</span>
        <span className={styles.arrowBox}><Arrow className={styles.arrowSVG} style={toggleStyle} /></span>
      </button>
      {isOpen && (
        <div className={styles.dropdown} style={inLineStyle}>
          {optionList.map((option, i) => (
            <div
              key={`dropdown-${option.name}-${i}`}
              className={styles.option}
              onClick={() => handler(option)}
            >
              {option.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SelectBox;
