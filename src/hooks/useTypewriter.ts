import { useState, useEffect } from "react";

export function useTypewriter(texts: string | string[], speed: number = 40, delay: number = 2500, loop: boolean = false) {
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const [textIndex, setTextIndex] = useState(0);
  
  const textArray = Array.isArray(texts) ? texts : [texts];

  useEffect(() => {
    let index = 0;
    setDisplayedText("");
    setIsComplete(false);
    
    if (textArray.length === 0) return;
    const currentText = textArray[textIndex];

    const timer = setInterval(() => {
      if (index <= currentText.length) {
        setDisplayedText(currentText.substring(0, index));
        index++;
      } else {
        clearInterval(timer);
        setIsComplete(true);
        
        if (loop && textArray.length > 1) {
          setTimeout(() => {
            setTextIndex((prev) => (prev + 1) % textArray.length);
          }, delay);
        }
      }
    }, speed);

    return () => clearInterval(timer);
  }, [textIndex, speed, delay, loop, JSON.stringify(textArray)]);

  return { displayedText, isComplete };
}
