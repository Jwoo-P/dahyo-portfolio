"use client";

import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import type { Project } from "@/types";
import { Tag } from "@/components/common/Tag";
import { ProjectImageGallery } from "@/components/what/ProjectImageGallery";
import { getProjectImages } from "@/lib/projectImages";

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-1.5">
      {items.map((item) => (
        <li
          key={item}
          className="flex gap-2 text-sm text-[var(--color-muted)] leading-relaxed"
        >
          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--color-muted)]" />
          {item}
        </li>
      ))}
    </ul>
  );
}

interface WhatDetailModalProps {
  project: Project;
  onClose: () => void;
}

export function WhatDetailModal({ project, onClose }: WhatDetailModalProps) {
  const [mounted, setMounted] = useState(false);
  const images = getProjectImages(project.slug);

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
      aria-labelledby="what-modal-title"
      onClick={onClose}
    >
      <div
        className="relative flex max-h-[92vh] sm:max-h-[85vh] w-full sm:max-w-2xl flex-col rounded-t-xl sm:rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-[var(--color-border)] bg-[var(--color-surface)] px-5 py-4 rounded-t-xl sm:rounded-t-xl">
          <div className="min-w-0 flex-1">
            <p className="text-xs font-medium uppercase tracking-widest text-[var(--color-muted)] mb-1">
              What
            </p>
            <h2
              id="what-modal-title"
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

        <div className="overflow-y-auto px-5 py-5 space-y-5">
          {images.length > 0 && (
            <ProjectImageGallery
              images={images}
              projectTitle={project.title}
            />
          )}

          <div>
            <h4 className="text-xs font-medium uppercase tracking-widest text-[var(--color-muted)] mb-2">
              프로젝트 개요
            </h4>
            <p className="text-sm leading-relaxed text-[var(--color-muted)]">
              {project.what.overview}
            </p>
          </div>

          <div>
            <h4 className="text-xs font-medium uppercase tracking-widest text-[var(--color-muted)] mb-2">
              담당 업무
            </h4>
            <BulletList items={project.what.responsibilities} />
          </div>

          <div>
            <h4 className="text-xs font-medium uppercase tracking-widest text-[var(--color-muted)] mb-2">
              주요 산출물
            </h4>
            <BulletList items={project.what.deliverables} />
          </div>

          <div>
            <h4 className="text-xs font-medium uppercase tracking-widest text-[var(--color-muted)] mb-2">
              핵심 포인트
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {project.what.highlights.map((h) => (
                <span
                  key={h}
                  className="inline-block rounded-md bg-white border border-[var(--color-border)] px-2.5 py-1 text-xs"
                >
                  {h}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-1 border-t border-[var(--color-border)]">
            <Link
              href={`/portfolio/how/${project.slug}`}
              className="inline-flex items-center gap-1.5 text-sm font-medium hover:opacity-70 transition-opacity"
            >
              How 자세히 보기
              <span aria-hidden>→</span>
            </Link>
            {project.howStatus === "draft" && (
              <span className="ml-3 text-xs text-[var(--color-muted)]">
                준비 중
              </span>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
