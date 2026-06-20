export type HowStatus = "draft" | "ready";

export type ProjectCategory = "company" | "side-team" | "side-personal";

export interface WhatContent {
  overview: string;
  responsibilities: string[];
  deliverables: string[];
  highlights: string[];
}

export interface Project {
  id: string;
  slug: string;
  order: number;
  category: ProjectCategory;
  company: string;
  title: string;
  period: string;
  role: string;
  summary: string;
  tags: string[];
  what: WhatContent;
  howStatus: HowStatus;
  hidden?: boolean;
}

export interface Experience {
  company: string;
  period: string;
  role: string;
  description?: string;
  tasks?: string[];
}

export interface Education {
  school: string;
  major: string;
  period: string;
}

export interface Certification {
  name: string;
  period: string;
}

export interface About {
  name: string;
  headline: string;
  bio: string;
  experiences: Experience[];
  education?: Education[];
  certifications?: Certification[];
  skills: string[];
  links?: { label: string; url: string }[];
}

export interface HowContent {
  slug: string;
  title: string;
  status: HowStatus;
  content: string;
}

export const CATEGORY_LABELS: Record<ProjectCategory, string> = {
  company: "회사 프로젝트",
  "side-team": "사이드 프로젝트 (팀)",
  "side-personal": "사이드 프로젝트 (개인)",
};
