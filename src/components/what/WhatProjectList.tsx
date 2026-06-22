"use client";

import { useMemo, useState } from "react";
import type { Project } from "@/types";
import {
  CategoryFilter,
  type CategoryFilterValue,
} from "@/components/what/CategoryFilter";
import { KeywordFilter } from "@/components/what/KeywordFilter";
import { ProjectCardGrid } from "@/components/what/ProjectCardGrid";
import { WhatDetailModal } from "@/components/what/WhatDetailModal";

function getUniqueTags(projects: Project[]): string[] {
  const counts = new Map<string, number>();
  for (const project of projects) {
    for (const tag of project.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }
  return [...counts.keys()].sort((a, b) => {
    const countDiff = (counts.get(b) ?? 0) - (counts.get(a) ?? 0);
    return countDiff !== 0 ? countDiff : a.localeCompare(b, "ko");
  });
}

function filterByCategory(
  projects: Project[],
  category: CategoryFilterValue
): Project[] {
  if (category === "all") return projects;
  if (category === "company") {
    return projects.filter((project) => project.category === "company");
  }
  return projects.filter(
    (project) =>
      project.category === "side-team" || project.category === "side-personal"
  );
}

function filterByTags(projects: Project[], selectedTags: string[]): Project[] {
  if (selectedTags.length === 0) return projects;
  return projects.filter((project) =>
    selectedTags.some((tag) => project.tags.includes(tag))
  );
}

function sortProjects(projects: Project[]): Project[] {
  const company = projects
    .filter((p) => p.category === "company")
    .sort((a, b) => b.order - a.order);
  const side = projects
    .filter((p) => p.category === "side-team" || p.category === "side-personal")
    .sort((a, b) => b.order - a.order);

  return [...company, ...side];
}

interface WhatProjectListProps {
  projects: Project[];
}

export function WhatProjectList({ projects }: WhatProjectListProps) {
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryFilterValue>("all");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const allTags = useMemo(() => getUniqueTags(projects), [projects]);

  const filteredProjects = useMemo(() => {
    const byCategory = filterByCategory(projects, selectedCategory);
    return sortProjects(filterByTags(byCategory, selectedTags));
  }, [projects, selectedCategory, selectedTags]);

  const selectedProject = selectedSlug
    ? filteredProjects.find((p) => p.slug === selectedSlug)
    : undefined;

  function handleToggle(tag: string) {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  }

  return (
    <>
      <CategoryFilter
        selected={selectedCategory}
        onChange={setSelectedCategory}
      />

      <KeywordFilter
        tags={allTags}
        selectedTags={selectedTags}
        onToggle={handleToggle}
        onClear={() => setSelectedTags([])}
      />

      <div className="py-4">
        {filteredProjects.length === 0 ? (
          <p className="py-12 text-center text-sm text-[var(--color-muted)]">
            선택한 조건에 해당하는 프로젝트가 없습니다.
          </p>
        ) : (
          <ProjectCardGrid
            projects={filteredProjects}
            onSelect={setSelectedSlug}
          />
        )}
      </div>

      {selectedProject && (
        <WhatDetailModal
          project={selectedProject}
          onClose={() => setSelectedSlug(null)}
        />
      )}
    </>
  );
}
