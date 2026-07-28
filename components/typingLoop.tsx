"use client";

import { useEffect, useState, useRef } from "react";

interface TypingLoopProps {
  words: string[];
  typingSpeed?: number;
  eraseSpeed?: number;
  delayBetween?: number;
  className?: string;
}

export default function TypingLoop({
  words,
  typingSpeed = 100,
  eraseSpeed = 50,
  delayBetween = 1200,
  className = "",
}: TypingLoopProps) {
  const [displayText, setDisplayText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const currentWord = words[wordIndex];

    if (isPaused) {
      timeoutRef.current = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, delayBetween);
      return;
    }

    if (isDeleting) {
      if (displayText === "") {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % words.length);
      } else {
        timeoutRef.current = setTimeout(() => {
          setDisplayText((prev) => prev.slice(0, -1));
        }, eraseSpeed);
      }
    } else {
      if (displayText === currentWord) {
        setIsPaused(true);
      } else {
        timeoutRef.current = setTimeout(() => {
          setDisplayText(
            currentWord.slice(0, displayText.length + 1)
          );
        }, typingSpeed);
      }
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [
    displayText,
    wordIndex,
    isDeleting,
    isPaused,
    words,
    typingSpeed,
    eraseSpeed,
    delayBetween,
  ]);

  return (
    <span className={className}>
      {displayText}

      <span
        className="
          inline-block w-[2px] h-[1.2em]
          ml-1 align-middle
          animate-pulse
        "
        style={{
          backgroundColor: "#D4A94D",
          boxShadow:
            "0 0 8px rgba(212,169,77,0.6), 0 0 14px rgba(212,169,77,0.3)",
        }}
      />
    </span>
  );
}