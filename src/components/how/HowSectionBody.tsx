"use client";

import { useMemo } from "react";
import { parseHowBodySegments } from "@/lib/howBodyParser";

interface HowSectionBodyProps {
  body: string;
  imageIndexOffset?: number;
  onImageClick?: (index: number) => void;
}

export function HowSectionBody({
  body,
  imageIndexOffset = 0,
  onImageClick,
}: HowSectionBodyProps) {
  const segments = useMemo(
    () => parseHowBodySegments(body, imageIndexOffset),
    [body, imageIndexOffset]
  );

  return (
    <div className="space-y-4">
      {segments.map((segment) => {
        if (segment.type === "image") {
          return (
            <figure key={segment.key} className="my-6">
              <button
                type="button"
                onClick={() => onImageClick?.(segment.imageIndex)}
                className="group block w-full cursor-pointer overflow-hidden rounded-lg border border-[var(--color-border)] bg-white"
                aria-label={segment.alt ? `${segment.alt} 확대` : "이미지 확대"}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={segment.src}
                  alt={segment.alt}
                  className="w-full transition-transform duration-200 group-hover:scale-[1.01]"
                />
              </button>
              {segment.alt ? (
                <figcaption className="mt-2 text-center text-xs text-[var(--color-muted)]">
                  {segment.alt}
                </figcaption>
              ) : null}
            </figure>
          );
        }

        const text = segment.content.trim();
        if (!text) return null;

        return (
          <p
            key={segment.key}
            className="text-sm leading-relaxed text-[var(--color-muted)] whitespace-pre-line"
          >
            {text}
          </p>
        );
      })}
    </div>
  );
}
