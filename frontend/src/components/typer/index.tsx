import React, { useState } from "react";

type Props = {
  texts: string[];
};

const Typer = ({ texts }: Props) => {
  const [idx, setIdx] = useState<number>(0);
  const [text, setText] = useState<string>(texts[idx] ?? "");
  return (
    <>
      <span>{text}</span>
      <span className=" animate-blink border-l-4 border-gray-100" />
    </>
  );
};

export default Typer;
