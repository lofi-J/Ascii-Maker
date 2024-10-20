import {ReactNode} from "react";
import styles from "./Fieldset.module.css";

interface IFieldset {
  children: ReactNode;
  title: string;
}

const Fieldset = ({children, title}: IFieldset) => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>{title}</div>
      <div className={styles.children}>
        {children}
      </div>
    </div>
  );
}

export default Fieldset;
