import {ReactNode} from "react";
import styles from "./Fieldset.module.css";

interface IFieldset {
  children: ReactNode;
  title: string;
  flex?: number;
}

const Fieldset = ({children, title, flex = 1}: IFieldset) => {

  return (
    <div className={styles.container} style={{flex: flex}}>
      <div className={styles.title}>{title}</div>
      <div className={styles.children}>
        {children}
      </div>
    </div>
  );
}

export default Fieldset;
