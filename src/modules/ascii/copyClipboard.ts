import {RefObject} from "react";

const copyClipboard = async (asciiRef: RefObject<HTMLPreElement>) => {
  if (!asciiRef.current) return;
  try {
    await navigator.clipboard.writeText(asciiRef.current.innerText);
    alert("Copied to clipboard");
  } catch (error) {
    console.error(error);
  }
}

export default copyClipboard;
