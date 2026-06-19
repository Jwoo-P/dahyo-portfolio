"use client";

import { useState } from "react";
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

function AccordionItem({ project }: { project: Project }) {
  const [open, setOpen] = useState(false);
  const orderLabel = String(project.order).padStart(2, "0");
  const images = getProjectImages(project.slug);

  return (
    <div className="border-b border-[var(--color-border)] last:border-b-0">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full text-left py-5 px-1 group cursor-pointer"
        aria-expanded={open}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-baseline gap-3 mb-1.5">
              <span className="text-xs font-mono text-[var(--color-muted)] tabular-nums">
                {orderLabel}
              </span>
              <h3 className="text-base font-medium leading-snug">
                {project.title}
              </h3>
            </div>
            <p className="text-xs text-[var(--color-muted)] mb-2">
              {project.period} · {project.role}
              {project.category === "company" && (
                <span className="ml-1.5">· {project.company}</span>
              )}
            </p>
            <p className="text-sm text-[var(--color-muted)] leading-relaxed mb-3">
              {project.summary}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
          </div>
          <span
            className={`mt-1 shrink-0 text-[var(--color-muted)] transition-transform duration-200 ${
              open ? "rotate-45" : ""
            }`}
            aria-hidden
          >
            +
          </span>
        </div>
      </button>

      {open && (
        <div className="pb-6 px-1 space-y-5 border-t border-dashed border-[var(--color-border)] pt-5">
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

          <div className="pt-1">
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
      )}
    </div>
  );
}

interface ProjectAccordionProps {
  projects: Project[];
  groupLabel?: string;
}

export function ProjectAccordion({
  projects,
  groupLabel,
}: ProjectAccordionProps) {
  return (
    <div>
      {groupLabel && (
        <h3 className="text-xs font-medium uppercase tracking-widest text-[var(--color-muted)] py-4 border-b border-[var(--color-border)]">
          {groupLabel}
        </h3>
      )}
      {projects.map((project) => (
        <AccordionItem key={project.slug} project={project} />
      ))}
    </div>
  );
}
