"use client";

import type { Project } from "@/types";
import { Tag } from "@/components/common/Tag";

interface HowProjectCardGridProps {
  projects: Project[];
  groupLabel?: string;
  onSelect: (slug: string) => void;
}

function HowProjectCard({
  project,
  onSelect,
}: {
  project: Project;
  onSelect: () => void;
}) {
  const orderLabel = String(project.order).padStart(2, "0");

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onSelect}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect();
        }
      }}
      className="group flex h-full w-full flex-col rounded-lg border border-[var(--color-border)] bg-white p-4 text-left transition-shadow hover:shadow-md cursor-pointer"
    >
      <div className="flex items-baseline gap-2 mb-2">
        <span className="text-xs font-mono text-[var(--color-muted)] tabular-nums">
          {orderLabel}
        </span>
        <h3 className="text-sm font-medium leading-snug group-hover:opacity-80 transition-opacity">
          {project.title}
        </h3>
      </div>

      <p className="text-xs text-[var(--color-muted)] mb-2">
        {project.period} · {project.role}
        {project.category === "company" && (
          <span className="ml-1">· {project.company}</span>
        )}
      </p>

      <p className="text-sm text-[var(--color-muted)] leading-relaxed line-clamp-3 mb-3 flex-1">
        {project.summary}
      </p>

      <div className="flex flex-wrap gap-1.5">
        {project.tags.slice(0, 4).map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
        {project.tags.length > 4 && (
          <span className="text-xs text-[var(--color-muted)] self-center">
            +{project.tags.length - 4}
          </span>
        )}
      </div>
    </div>
  );
}

export function HowProjectCardGrid({
  projects,
  groupLabel,
  onSelect,
}: HowProjectCardGridProps) {
  return (
    <div className="mb-8 last:mb-0">
      {groupLabel && (
        <h3 className="text-xs font-medium uppercase tracking-widest text-[var(--color-muted)] mb-4">
          {groupLabel}
        </h3>
      )}
      <div className="grid gap-3 sm:grid-cols-2">
        {projects.map((project) => (
          <HowProjectCard
            key={project.slug}
            project={project}
            onSelect={() => onSelect(project.slug)}
          />
        ))}
      </div>
    </div>
  );
}
