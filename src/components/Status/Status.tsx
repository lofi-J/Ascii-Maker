import styles from "./Status.module.css";
import {ReactNode, useEffect} from "react";


type status = 'processing' | 'success' | 'failed';
interface IStatus {
  file: File | undefined;
  status: {key: string, value: ReactNode, status: status}[];
  onLoad: () => void;
}

const Status = ({file, status, onLoad}: IStatus) => {
  
  const getEmoji = (status: status) => {
    switch (status) {
      case "processing":
        return <b className={styles.processing}>☕</b>
      case "success":
        return <b className={styles.success}>✔</b>
      case "failed":
        return <b className={styles.fail}>❌</b>
    }
  }
  
  const byteToKB = (byte: number) => (byte / 1024).toFixed(2);
  
  useEffect(() => {
    onLoad();
  }, [onLoad]);
  
  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <span className={styles.title}>
          <em className={styles.gray}>name: </em>{file ? file.name : 'null'}
        </span>
      </div>
      <div className={styles.row}>
        <span className={styles.title}>
          <em className={styles.gray}>type: </em>{file ? file.type : 'null'}
        </span>
      </div>
      <div className={styles.row} style={{ marginBottom: '1.2rem' }}>
        <span className={styles.title}>
          <em className={styles.gray}>size: </em>{file ? byteToKB(file.size) : '0'}kb
        </span>
      </div>
      {status.map((item, i) => (
        <div key={`status-${i}`} className={styles.row}>
          {getEmoji(item.status)}
          <span className={styles.title}>{item.key}</span> <span className={styles.value}>{item.value}</span>
        </div>
      ))}
    </div>
  );
}

export default Status;
