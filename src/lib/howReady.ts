import type { HowContent, Project } from "@/types";

export function isHowReady(project: Project, how?: HowContent): boolean {
  if (project.howStatus === "draft") return false;
  if (!how || how.status === "draft") return false;
  return true;
}
