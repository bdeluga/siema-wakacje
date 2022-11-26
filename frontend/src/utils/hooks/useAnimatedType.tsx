import { useEffect, useState } from "react";

export const useAnimatedType = (texts: string[]) => {
  const [typedText, setTypedText] = useState("");
  const [listIndex, setListIndex] = useState<number>(0);
  const [phase, setPhase] = useState<"Typing" | "Deleting">("Typing");
  useEffect(() => {
    if (phase === "Typing") {
      const nextWordState = texts[listIndex]?.slice(0, typedText.length + 1);
      if (nextWordState === typedText) {
        const timeout = setTimeout(() => {
          setPhase("Deleting");
        }, 1000);
        return () => clearTimeout(timeout);
      }
      const timeout = setTimeout(() => {
        if (nextWordState) setTypedText(nextWordState);
      }, 140);

      return () => clearTimeout(timeout);
    } else {
      if (typedText === "") {
        setPhase("Typing");
        setListIndex(texts[listIndex + 1] ? listIndex + 1 : 0);
      }
      const previousWordState =
        texts[listIndex]?.slice(0, typedText.length - 1) ?? "";

      const timeout = setTimeout(() => {
        setTypedText(previousWordState);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [typedText, texts, phase, listIndex]);

  console.log(typedText);
  return { typedText };
};
