"use client";

import { useState } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { cn } from "@/lib/utils";

interface ScreenshotCarouselProps {
  screenshots: { url: string; caption: string }[];
}

export function ScreenshotCarousel({ screenshots }: ScreenshotCarouselProps) {
  const [current, setCurrent] = useState(0);

  if (!screenshots.length) {
    return (
      <div className="flex h-64 items-center justify-center rounded-lg border border-carbon-border bg-carbon-light">
        <span className="font-mono text-sm text-text-muted">
          No screenshots yet
        </span>
      </div>
    );
  }

  const prev = () => setCurrent((c) => (c === 0 ? screenshots.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === screenshots.length - 1 ? 0 : c + 1));

  return (
    <div className="relative overflow-hidden rounded-lg border border-carbon-border">
      {/* Image */}
      <div className="relative aspect-video bg-carbon-light">
        <div className="flex h-full items-center justify-center">
          <div className="text-center">
            <div className="font-mono text-sm text-text-muted">
              [{screenshots[current].caption || `Screenshot ${current + 1}`}]
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <button
        onClick={prev}
        className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full border border-carbon-border bg-carbon/80 p-1.5 text-text-secondary transition-colors hover:border-neon hover:text-neon"
      >
        <HiChevronLeft size={20} />
      </button>
      <button
        onClick={next}
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full border border-carbon-border bg-carbon/80 p-1.5 text-text-secondary transition-colors hover:border-neon hover:text-neon"
      >
        <HiChevronRight size={20} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
        {screenshots.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={cn(
              "h-1.5 rounded-full transition-all",
              i === current
                ? "w-6 bg-neon"
                : "w-1.5 bg-carbon-border hover:bg-text-muted"
            )}
          />
        ))}
      </div>
    </div>
  );
}
