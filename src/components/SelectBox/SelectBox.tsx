"use client";
import styles from "./SelectBox.module.css";
import {useRef, useState} from "react";
import useOutsideClick from "@/hooks/useOutsideClick";


interface ISelectBox {
  optionList: {name: string; value: string}[];
  baseItem?: {name: string; value: string};
  onChange: (value: string) => void;
}

const SelectBox = ({optionList, onChange, baseItem = optionList[0]}: ISelectBox) => {
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
  
  return (
    <div className={styles.container} ref={ref}>
      <button
        className={styles.button}
        onClick={() => toggleDropDown()}
      >
        {localItem.name}
      </button>
      {isOpen && (
        <div className={styles.dropdown}>
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
