"use client";

import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";

export interface LightboxImage {
  src: string;
  alt: string;
}

interface ImageLightboxProps {
  images: LightboxImage[];
  index: number | null;
  onClose: () => void;
  onChangeIndex: (index: number) => void;
}

export function ImageLightbox({
  images,
  index,
  onClose,
  onChangeIndex,
}: ImageLightboxProps) {
  const [mounted, setMounted] = useState(false);

  const goPrev = useCallback(() => {
    if (index === null) return;
    onChangeIndex((index - 1 + images.length) % images.length);
  }, [index, images.length, onChangeIndex]);

  const goNext = useCallback(() => {
    if (index === null) return;
    onChangeIndex((index + 1) % images.length);
  }, [index, images.length, onChangeIndex]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (index === null) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [index, onClose, goPrev, goNext]);

  if (!mounted || index === null) return null;

  const current = images[index];

  return createPortal(
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-4"
      role="dialog"
      aria-modal="true"
      aria-label="이미지 뷰어"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white text-xl leading-none hover:bg-white/20 transition-colors cursor-pointer"
        aria-label="닫기"
      >
        ×
      </button>

      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goPrev();
            }}
            className="absolute left-2 sm:left-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white text-lg hover:bg-white/20 transition-colors cursor-pointer"
            aria-label="이전 이미지"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goNext();
            }}
            className="absolute right-2 sm:right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white text-lg hover:bg-white/20 transition-colors cursor-pointer"
            aria-label="다음 이미지"
          >
            ›
          </button>
        </>
      )}

      <div
        className="relative max-h-[85vh] max-w-[90vw]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={current.src}
          alt={current.alt || `이미지 ${index + 1}`}
          className="max-h-[85vh] max-w-[90vw] object-contain rounded-sm"
        />
        {images.length > 1 && (
          <p className="mt-3 text-center text-sm text-white/70">
            {index + 1} / {images.length}
          </p>
        )}
      </div>
    </div>,
    document.body
  );
}
