"use client";

import { useMemo, useState } from "react";
import { CATEGORY_LABELS } from "@/types";
import type { Project } from "@/types";
import {
  CategoryFilter,
  type CategoryFilterValue,
} from "@/components/what/CategoryFilter";
import { KeywordFilter } from "@/components/what/KeywordFilter";
import { ProjectAccordion } from "@/components/what/ProjectAccordion";

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

function groupProjects(projects: Project[]) {
  const companyGroups = new Map<string, Project[]>();
  const sideTeam: Project[] = [];
  const sidePersonal: Project[] = [];

  const companyProjects = projects
    .filter((p) => p.category === "company")
    .sort((a, b) => b.order - a.order);

  for (const p of companyProjects) {
    const list = companyGroups.get(p.company) ?? [];
    list.push(p);
    companyGroups.set(p.company, list);
  }

  for (const p of projects) {
    if (p.category === "side-team") {
      sideTeam.push(p);
    } else if (p.category === "side-personal") {
      sidePersonal.push(p);
    }
  }

  return { companyGroups, sideTeam, sidePersonal };
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

interface WhatProjectListProps {
  projects: Project[];
}

export function WhatProjectList({ projects }: WhatProjectListProps) {
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryFilterValue>("all");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const allTags = useMemo(() => getUniqueTags(projects), [projects]);

  const filteredProjects = useMemo(() => {
    const byCategory = filterByCategory(projects, selectedCategory);
    return filterByTags(byCategory, selectedTags);
  }, [projects, selectedCategory, selectedTags]);

  const { companyGroups, sideTeam, sidePersonal } = useMemo(
    () => groupProjects(filteredProjects),
    [filteredProjects]
  );

  const hasResults =
    companyGroups.size > 0 || sideTeam.length > 0 || sidePersonal.length > 0;

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

      <div className="py-2">
        {!hasResults ? (
          <p className="py-12 text-center text-sm text-[var(--color-muted)]">
            선택한 조건에 해당하는 프로젝트가 없습니다.
          </p>
        ) : (
          <>
            {Array.from(companyGroups.entries()).map(([company, items]) => (
              <ProjectAccordion
                key={company}
                groupLabel={company}
                projects={items}
              />
            ))}

            {sideTeam.length > 0 && (
              <ProjectAccordion
                groupLabel={CATEGORY_LABELS["side-team"]}
                projects={sideTeam}
              />
            )}

            {sidePersonal.length > 0 && (
              <ProjectAccordion
                groupLabel={CATEGORY_LABELS["side-personal"]}
                projects={sidePersonal}
              />
            )}
          </>
        )}
      </div>
    </>
  );
}
