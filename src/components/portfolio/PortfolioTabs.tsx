"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export type PortfolioTab = "what" | "how";

const tabs: { id: PortfolioTab; label: string }[] = [
  { id: "what", label: "What" },
  { id: "how", label: "How" },
];

interface PortfolioTabsProps {
  activeTab: PortfolioTab;
}

export function PortfolioTabs({ activeTab }: PortfolioTabsProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function handleTabChange(tab: PortfolioTab) {
    const params = new URLSearchParams(searchParams.toString());
    if (tab === "how") {
      params.set("tab", "how");
    } else {
      params.delete("tab");
    }
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }

  return (
    <div
      role="tablist"
      aria-label="포트폴리오 탭"
      className="flex gap-1 border-b border-[var(--color-border)]"
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => handleTabChange(tab.id)}
            className={`relative px-4 py-3 text-sm transition-colors cursor-pointer ${
              isActive
                ? "font-medium text-[var(--color-accent)]"
                : "text-[var(--color-muted)] hover:text-[var(--color-accent)]"
            }`}
          >
            {tab.label}
            {isActive && (
              <span className="absolute inset-x-4 -bottom-px h-0.5 bg-[var(--color-accent)]" />
            )}
          </button>
        );
      })}
    </div>
  );
}
