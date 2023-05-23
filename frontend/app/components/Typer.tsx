"use client";
import React from "react";
import { useAnimatedType } from "../utils/hooks/useAnimatedType";

const Typer = () => {
  const { typedText } = useAnimatedType([
    "hotelu?",
    "restauracji?",
    "trasy rowerowej?",
    "zabytków w okolicy?",
    "klubu?",
    "obiektu sportowego?",
    "parku?",
  ]);
  return (
    <>
      <span>{typedText}</span>
      <span className=" animate-blink border-l-4 border-slate-800" />
    </>
  );
};

export default Typer;
