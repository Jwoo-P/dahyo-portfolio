"use client";

import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

interface ProjectImageGalleryProps {
  images: string[];
  projectTitle: string;
}

export function ProjectImageGallery({
  images,
  projectTitle,
}: ProjectImageGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const goPrev = useCallback(() => {
    setLightboxIndex((prev) =>
      prev === null ? null : (prev - 1 + images.length) % images.length
    );
  }, [images.length]);

  const goNext = useCallback(() => {
    setLightboxIndex((prev) =>
      prev === null ? null : (prev + 1) % images.length
    );
  }, [images.length]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (lightboxIndex === null) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    }

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [lightboxIndex, closeLightbox, goPrev, goNext]);

  if (images.length === 0) return null;

  return (
    <>
      <div
        className={`grid gap-2 ${
          images.length <= 3 ? "grid-cols-3" : "grid-cols-2 sm:grid-cols-4"
        }`}
      >
        {images.map((src, index) => (
          <button
            key={src}
            type="button"
            onClick={() => setLightboxIndex(index)}
            className="group block w-full overflow-hidden rounded-md border border-[var(--color-border)] bg-white cursor-pointer"
            aria-label={`${projectTitle} 이미지 ${index + 1} 확대`}
          >
            <Image
              src={src}
              alt={`${projectTitle} 스크린샷 ${index + 1}`}
              width={0}
              height={0}
              sizes="(max-width: 640px) 50vw, 25vw"
              className="h-auto w-full transition-transform duration-200 group-hover:scale-[1.02]"
            />
          </button>
        ))}
      </div>

      {mounted && lightboxIndex !== null && createPortal(
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={`${projectTitle} 이미지 뷰어`}
          onClick={closeLightbox}
        >
          <button
            type="button"
            onClick={closeLightbox}
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
              src={images[lightboxIndex]}
              alt={`${projectTitle} 스크린샷 ${lightboxIndex + 1}`}
              className="max-h-[85vh] max-w-[90vw] object-contain rounded-sm"
            />
            {images.length > 1 && (
              <p className="mt-3 text-center text-sm text-white/70">
                {lightboxIndex + 1} / {images.length}
              </p>
            )}
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
