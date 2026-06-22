"use client";

import Image from "next/image";
import type { Project } from "@/types";
import { Tag } from "@/components/common/Tag";
import { getProjectImages } from "@/lib/projectImages";

interface ProjectCardGridProps {
  projects: Project[];
  onSelect: (slug: string) => void;
}

function ProjectCard({
  project,
  onSelect,
}: {
  project: Project;
  onSelect: () => void;
}) {
  const thumbnail = getProjectImages(project.slug)[0];

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
      className="group flex h-full w-full flex-col overflow-hidden rounded-lg border border-[var(--color-border)] bg-white text-left transition-shadow hover:shadow-md cursor-pointer"
    >
      {thumbnail && (
        <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-[var(--color-border)] bg-[var(--color-surface)]">
          <Image
            src={thumbnail}
            alt={`${project.title} 썸네일`}
            fill
            sizes="(max-width: 640px) 100vw, 50vw"
            className="object-cover transition-transform duration-200 group-hover:scale-[1.02]"
          />
        </div>
      )}

      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-sm font-medium leading-snug mb-2 group-hover:opacity-80 transition-opacity">
          {project.title}
        </h3>

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
    </div>
  );
}

export function ProjectCardGrid({
  projects,
  onSelect,
}: ProjectCardGridProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard
            key={project.slug}
            project={project}
            onSelect={() => onSelect(project.slug)}
          />
        ))}
    </div>
  );
}
