"use client";

import {RefObject, useEffect} from "react";

const useOutsideClick = (ref: RefObject<HTMLElement>, handler: () => void) => {
  
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (!ref.current) return;
      
      if (!ref.current.contains(event.target as Node)) {
        handler();
      }
    }
    
    document.addEventListener('mousedown', listener);
    return () => document.removeEventListener('mousedown', listener);
  }, [ref, handler]);
}

export default useOutsideClick;
