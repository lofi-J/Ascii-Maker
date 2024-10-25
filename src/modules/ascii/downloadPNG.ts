import {RefObject} from "react";
import html2canvas from "html2canvas";

const nameFormat = (name: string) => {
  return name.replace(/\..*$/, '');
}

const downloadPNG = (asciiRef: RefObject<HTMLPreElement>, pngName: string) => {
  if (asciiRef.current) {
    html2canvas(asciiRef.current).then((canvas) => {
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = `${nameFormat(pngName)}.png`;
      link.click();
    });
  }
}

export default downloadPNG;
