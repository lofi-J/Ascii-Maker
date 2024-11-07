import {useEffect, useState} from "react";


interface IMemory {
  usedJSHeapSize: number;
  totalJSHeapSize: number;
}

type TMemoryInfo = {usedSize: number, totalSize: number};

const byteToMib = (byte: number) => byte / 1048576;

const useMemory = () => {
  const [memoryInfo, setMemoryInfo] = useState<TMemoryInfo | null>(null);
  
  useEffect(() => {
    if (typeof window !== 'undefined' && 'memory' in performance) {
      const memory = performance.memory as IMemory;
      const usedJSHeap = byteToMib(memory.usedJSHeapSize);
      const totalJSHeapSize = byteToMib(memory.totalJSHeapSize);
      setMemoryInfo({usedSize: usedJSHeap, totalSize: totalJSHeapSize});
    }
  }, []);
  
  return memoryInfo;
}

export default useMemory;
