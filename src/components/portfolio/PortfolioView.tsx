"use client";

import { useSearchParams } from "next/navigation";
import type { HowContent, Project } from "@/types";
import { HowProjectList } from "@/components/how/HowProjectList";
import { PortfolioTabs, type PortfolioTab } from "@/components/portfolio/PortfolioTabs";
import { WhatProjectList } from "@/components/what/WhatProjectList";

interface PortfolioViewProps {
  projects: Project[];
  howBySlug: Record<string, HowContent | undefined>;
}

const tabDescriptions: Record<PortfolioTab, string> = {
  what: "어떤 업무를 했는지 프로젝트별로 한눈에 확인할 수 있습니다. 항목을 펼치면 프로젝트 요약을 볼 수 있습니다.",
  how: "프로젝트를 어떤 방식으로 수행했는지 카드를 클릭해 상세 과정을 확인할 수 있습니다.",
};

export function PortfolioView({ projects, howBySlug }: PortfolioViewProps) {
  const searchParams = useSearchParams();
  const activeTab: PortfolioTab =
    searchParams.get("tab") === "how" ? "how" : "what";

  return (
    <>
      <section className="py-12 border-b border-[var(--color-border)]">
        <p className="text-xs font-medium uppercase tracking-widest text-[var(--color-muted)] mb-2">
          Portfolio
        </p>
        <h1 className="text-2xl font-semibold tracking-tight mb-3">
          {activeTab === "what" ? "What" : "How"}
        </h1>
        <p className="text-sm text-[var(--color-muted)] leading-relaxed mb-6">
          {tabDescriptions[activeTab]}
        </p>
        <PortfolioTabs activeTab={activeTab} />
      </section>

      <div role="tabpanel">
        {activeTab === "what" ? (
          <WhatProjectList projects={projects} />
        ) : (
          <HowProjectList projects={projects} howBySlug={howBySlug} />
        )}
      </div>
    </>
  );
}
