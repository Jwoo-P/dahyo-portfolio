"use client";

import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import type { HowContent, Project } from "@/types";
import { Tag } from "@/components/common/Tag";
import { HowContent as HowContentRenderer } from "@/components/how/HowContent";

interface HowDetailModalProps {
  project: Project;
  how: HowContent;
  onClose: () => void;
}

export function HowDetailModal({ project, how, onClose }: HowDetailModalProps) {
  const [mounted, setMounted] = useState(false);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  if (!mounted) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 p-0 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="how-modal-title"
      onClick={onClose}
    >
      <div
        className="relative flex max-h-[92vh] sm:max-h-[85vh] w-full sm:max-w-2xl flex-col rounded-t-xl sm:rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-[var(--color-border)] bg-[var(--color-surface)] px-5 py-4 rounded-t-xl sm:rounded-t-xl">
          <div className="min-w-0 flex-1">
            <p className="text-xs font-medium uppercase tracking-widest text-[var(--color-muted)] mb-1">
              How
            </p>
            <h2
              id="how-modal-title"
              className="text-lg font-semibold tracking-tight leading-snug"
            >
              {project.title}
            </h2>
            <p className="text-xs text-[var(--color-muted)] mt-1.5">
              {project.period} · {project.role}
              {project.category === "company" && (
                <span> · {project.company}</span>
              )}
            </p>
            <div className="flex flex-wrap gap-1.5 mt-3">
              {project.tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 flex h-8 w-8 items-center justify-center rounded-full border border-[var(--color-border)] bg-white text-[var(--color-muted)] hover:text-[var(--color-accent)] transition-colors cursor-pointer"
            aria-label="닫기"
          >
            ×
          </button>
        </div>

        <div className="overflow-y-auto px-5 py-6">
          <HowContentRenderer content={how.content} />
        </div>

        <div className="sticky bottom-0 border-t border-[var(--color-border)] bg-[var(--color-surface)] px-5 py-3 rounded-b-xl">
          <Link
            href={`/portfolio/how/${project.slug}`}
            className="inline-flex items-center gap-1.5 text-sm font-medium hover:opacity-70 transition-opacity"
          >
            전체 페이지로 보기
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </div>,
    document.body
  );
}
