"use client";
import {useState} from "react";

const Test = () => {
  const [screen, setScreen] = useState(['a']);

  return (
    <pre>
      {screen.map(char => char)}
    </pre>
  );
}

export default Test;
