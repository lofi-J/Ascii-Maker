"use client";
import moment from "moment";
import styles from "./Footer.module.css";
import Clock from "../../assets/clock.svg";
import Memory from "../../assets/memory.svg";
import useMemory from "@/hooks/useMemory";


const Footer = () => {
  const memoryInfo = useMemory();
  
  return (
    <footer className={styles.footer}>
      {memoryInfo ? (
        <span className={styles.row}>
          <Memory className={styles.icon} />
          <span className={styles.text}>
            {memoryInfo.usedSize.toFixed(0)}MiB
              / {memoryInfo.totalSize.toFixed(0)}MiB
          </span>
        </span>
      ) : <span />}
      <span className={styles.row}>
        <Clock className={styles.icon} />
        <span className={styles.text}>{moment().format('MM/DD hh:mm A')}</span>
      </span>
    </footer>
  );
}

export default Footer;
