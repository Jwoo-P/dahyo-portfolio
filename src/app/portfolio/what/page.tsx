import type { Metadata } from "next";
import { Suspense } from "react";
import { getVisibleProjects } from "@/lib/projects";
import { getAllHow } from "@/lib/how";
import { PortfolioView } from "@/components/portfolio/PortfolioView";

export const metadata: Metadata = {
  title: "Portfolio | 박다효 Portfolio",
  description:
    "어떤 업무를 했는지(What), 어떻게 수행했는지(How) 프로젝트별로 확인할 수 있습니다.",
};

export default function WhatPage() {
  const projects = getVisibleProjects();
  const howBySlug = Object.fromEntries(
    getAllHow().map((how) => [how.slug, how])
  );

  return (
    <div className="mx-auto max-w-3xl px-5">
      <Suspense>
        <PortfolioView projects={projects} howBySlug={howBySlug} />
      </Suspense>
    </div>
  );
}
