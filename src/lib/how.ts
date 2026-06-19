import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { HowContent, HowStatus } from "@/types";
import { getProjectBySlug } from "./projects";

const HOW_DIR = path.join(process.cwd(), "content", "how");

export function getAllHow(): HowContent[] {
  if (!fs.existsSync(HOW_DIR)) return [];

  return fs
    .readdirSync(HOW_DIR)
    .filter((file) => file.endsWith(".md"))
    .map((file) => getHowBySlug(file.replace(/\.md$/, "")))
    .filter((how): how is HowContent => how !== undefined);
}

export function getHowBySlug(slug: string): HowContent | undefined {
  const filePath = path.join(HOW_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return undefined;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const project = getProjectBySlug(slug);

  return {
    slug,
    title: project?.title ?? slug,
    status: (data.status as HowStatus) ?? "draft",
    content: content.trim(),
  };
}
