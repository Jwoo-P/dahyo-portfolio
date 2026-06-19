"use client";

export type CategoryFilterValue = "all" | "company" | "side";

const OPTIONS: { value: CategoryFilterValue; label: string }[] = [
  { value: "all", label: "전체" },
  { value: "company", label: "회사 프로젝트" },
  { value: "side", label: "사이드 프로젝트" },
];

interface CategoryFilterProps {
  selected: CategoryFilterValue;
  onChange: (value: CategoryFilterValue) => void;
}

export function CategoryFilter({ selected, onChange }: CategoryFilterProps) {
  return (
    <div className="py-5 border-b border-[var(--color-border)]">
      <p className="text-xs font-medium uppercase tracking-widest text-[var(--color-muted)] mb-3">
        프로젝트 유형
      </p>
      <div className="flex flex-wrap gap-2">
        {OPTIONS.map(({ value, label }) => {
          const isSelected = selected === value;
          return (
            <button
              key={value}
              type="button"
              onClick={() => onChange(value)}
              aria-pressed={isSelected}
              className={`inline-block rounded-full border px-2.5 py-0.5 text-xs transition-colors cursor-pointer ${
                isSelected
                  ? "border-[var(--color-accent)] bg-[var(--color-accent)] text-white"
                  : "border-[var(--color-border)] bg-white text-[var(--color-muted)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
