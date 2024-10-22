"use client";
import styles from "./TerminalStatus.module.css";
import React, {useEffect, useState} from "react";


interface ITerminalStatus {
  onLoad: () => void;
  loadTime: number | null;
}
interface IMemory {
  usedJSHeapSize: number;
  totalJSHeapSize: number;
}
type TMemoryInfo = {usedSize: number, totalSize: number};
type TUserAgentData = {brands: {brand: string, version: string}[], isMobile: boolean, platform: string};

const TerminalStatus = ({onLoad, loadTime}: ITerminalStatus) => {
  const [memoryInfo, setMemoryInfo] = useState<TMemoryInfo>();
  const [agentData, setAgentData] = useState<TUserAgentData>();
  
  useEffect(() => {
    // OS 정보
    if (typeof window !== 'undefined' && window.navigator) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const agentData = window.navigator.userAgentData;
      const brands = agentData.brands;
      const isMobile = agentData.mobile;
      const platform = agentData.platform;
      setAgentData({
        brands: brands,
        isMobile: isMobile,
        platform: platform
      })
    }
    
    // Memory 사용량 계산(브라우저에 API 없는경우 초기화 x)
    const byteToMib = (byte: number) => byte / 1048576;
    
    if (typeof window !== 'undefined' && 'memory' in performance) {
      const memory = performance.memory as IMemory;
      const usedJSHeap = byteToMib(memory.usedJSHeapSize);
      const totalJSHeapSize = byteToMib(memory.totalJSHeapSize);
      setMemoryInfo({usedSize: usedJSHeap, totalSize: totalJSHeapSize});
    }
  }, []);
  
  useEffect(() => {
    onLoad();
  }, [onLoad]);
  
  return (
    <div className={styles.container}>
      <div className={styles.appVersion}>
        ASCII Art Maker <em className={styles.version}>v 1.0</em>
        <span className={styles.gray}>
          ready in
          <em className={styles.em}>{loadTime !== null ? loadTime === 0 ? 0.1 : loadTime.toFixed(3) : '.'} ms</em>
        </span>
      </div>
      <div className={styles.userInfo}>
        {/* OS */}
        <div className={styles.row}>
          <em className={styles.em}>OS: </em> {agentData?.platform ? agentData.platform : 'Unknown'}
        </div>
        {/* Platform */}
        <div className={styles.row}>
          <em className={styles.em}>Browser: </em> {agentData?.brands[0].brand}
        </div>
        {/* Mobile */}
        <div className={styles.row}>
          <em className={styles.em}>Mobile: </em> {`${agentData?.isMobile}`}
        </div>
        {/* Memory */}
        {memoryInfo && (
          <div className={styles.row}>
            <em className={styles.em}>Memory:</em> {memoryInfo.usedSize.toFixed(2)}MiB
            / {memoryInfo.totalSize.toFixed(2)}MiB
          </div>
        )}
      </div>
    </div>
  );
}

export default TerminalStatus;
