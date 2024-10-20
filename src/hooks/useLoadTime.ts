import {useCallback, useEffect, useState} from "react";

const useLoadTime = (componentCount: number) => {
  const [loadedCount, setLoadedCount] = useState(0);
  const [time, setTime] = useState<number | null>(null);

  // 시작 시간 측정
  useEffect(() => {
    const startTime = performance.now(); // 기록
    // console.log(startTime);

    // 로드할 컴포넌트가 모두 로드된 경우
    if (loadedCount === componentCount) {
      const endTime = performance.now();
      // console.log(endTime);
      setTime(endTime - startTime);
    }
  }, [componentCount, loadedCount]);

  // 외부에서 핸들링할 incrementFn
  const incrementLoadCount = useCallback(() => {
    setLoadedCount(prev => prev + 1);
  }, [])

  return { time, incrementLoadCount };
}

export default useLoadTime;
