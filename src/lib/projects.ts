import fs from "fs";
import path from "path";
import yaml from "js-yaml";
import type { Project } from "@/types";

const PROJECTS_DIR = path.join(process.cwd(), "content", "projects");

export function getAllProjects(): Project[] {
  const files = fs
    .readdirSync(PROJECTS_DIR)
    .filter((f) => f.endsWith(".yaml"))
    .sort();

  return files.map((file) => {
    const raw = fs.readFileSync(path.join(PROJECTS_DIR, file), "utf-8");
    return yaml.load(raw) as Project;
  });
}

export function getProjectsByCategory(): Map<string, Project[]> {
  const projects = getAllProjects();
  const grouped = new Map<string, Project[]>();

  for (const project of projects) {
    const key =
      project.category === "company"
        ? project.company
        : project.company;
    const list = grouped.get(key) ?? [];
    list.push(project);
    grouped.set(key, list);
  }

  return grouped;
}

export function getProjectBySlug(slug: string): Project | undefined {
  return getAllProjects().find((p) => p.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return getAllProjects().map((p) => p.slug);
}
