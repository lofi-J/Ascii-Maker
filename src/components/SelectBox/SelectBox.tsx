"use client";
import styles from "./SelectBox.module.css";
import {useRef, useState} from "react";
import useOutsideClick from "@/hooks/useOutsideClick";


interface ISelectBox {
  optionList: {name: string; value: string}[];
  title: string;
}

const SelectBox = ({optionList, title}: ISelectBox) => {
  const ref = useRef<HTMLButtonElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  useOutsideClick(ref, () => setIsOpen(false));
  const toggleDropDown = () => setIsOpen(prev => !prev);
  
  return (
    <div className={styles.container}>
      <button
        ref={ref}
        className={styles.button}
        onClick={() => toggleDropDown()}
      >
        {title}
      </button>
      {isOpen && (
        <div className={styles.dropdown}>
          {optionList.map((option, i) => (
            <div key={`dropdown-${option.name}-${i}`} className={styles.option}>{option.name}</div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SelectBox;
