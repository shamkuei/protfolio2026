"use client";

import { useState, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";

export function TerminalAnimation() {
  const t = useTranslations("hero.terminal");
  const [lines, setLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const commands = t.raw("commands") as string[];

  const typeNextChar = useCallback(() => {
    if (currentLine >= commands.length) {
      setIsTyping(false);
      return;
    }

    const line = commands[currentLine];

    if (currentChar < line.length) {
      setCurrentChar((prev) => prev + 1);
    } else {
      setLines((prev) => [...prev, line]);
      setCurrentLine((prev) => prev + 1);
      setCurrentChar(0);
    }
  }, [currentLine, currentChar, commands]);

  useEffect(() => {
    const speed = currentChar === 0 ? 400 : 30 + Math.random() * 40;
    const timer = setTimeout(typeNextChar, speed);
    return () => clearTimeout(timer);
  }, [typeNextChar]);

  useEffect(() => {
    if (!isTyping) {
      const timer = setTimeout(() => {
        setLines([]);
        setCurrentLine(0);
        setCurrentChar(0);
        setIsTyping(true);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [isTyping]);

  const displayedLine = currentLine < commands.length
    ? commands[currentLine].slice(0, currentChar)
    : "";

  return (
    <div className="w-full overflow-hidden rounded-lg border border-carbon-border bg-carbon-light scanline">
      {/* Terminal header */}
      <div dir="ltr" className="flex items-center gap-2 border-b border-carbon-border px-4 py-2">
        <div className="flex gap-1.5">
          <div className="h-3 w-3 rounded-full bg-red-500/70" />
          <div className="h-3 w-3 rounded-full bg-yellow-500/70" />
          <div className="h-3 w-3 rounded-full bg-green-500/70" />
        </div>
        <span className="ml-2 font-mono text-xs text-text-muted">
          {t("prompt")} — zsh
        </span>
      </div>

      {/* Terminal body */}
      <div dir="ltr" className="p-4 font-mono text-sm leading-relaxed text-left">
        {lines.map((line, i) => (
          <div key={i} className="text-text-secondary">
            <span className="text-neon me-2">$</span>
            {line}
          </div>
        ))}
        {isTyping && currentLine < commands.length && (
          <div className="text-text-secondary">
            <span className="text-neon me-2">$</span>
            {displayedLine}
            <span className="cursor-blink" />
          </div>
        )}
      </div>
    </div>
  );
}
