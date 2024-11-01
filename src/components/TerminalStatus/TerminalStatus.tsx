"use client";
import styles from "./TerminalStatus.module.css";
import React, {useEffect, useState} from "react";
import useMemory from "@/hooks/useMemory";
import Link from "next/link";


interface ITerminalStatus {
  loadTime: number | null;
  type: string;
}

type TUserAgentData = {brands: {brand: string, version: string}[], isMobile: boolean, platform: string};

const TerminalStatus = ({loadTime, type}: ITerminalStatus) => {
  const [agentData, setAgentData] = useState<TUserAgentData>();
  const memoryInfo = useMemory();

  useEffect(() => {
    // OS 정보
    if (typeof window !== 'undefined' && window.navigator) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const agentData = window.navigator.userAgentData;
      console.log(agentData);
      if (agentData) {
        const brands = agentData.brands;
        const isMobile = agentData.mobile;
        const platform = agentData.platform;
        setAgentData({
          brands: brands,
          isMobile: isMobile,
          platform: platform
        })
      } else {
        return;
      }
    }
  }, []);


  return (
    <div className={styles.container}>
      <div className={styles.appVersion}>
        <Link href={"/"}>
          ASCII Art Maker [{type}]<em className={styles.version}>v 1.0</em>
        </Link>
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
};

export default TerminalStatus;
