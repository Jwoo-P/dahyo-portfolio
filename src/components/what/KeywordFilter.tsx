"use client";

interface KeywordFilterProps {
  tags: string[];
  selectedTags: string[];
  onToggle: (tag: string) => void;
  onClear: () => void;
}

export function KeywordFilter({
  tags,
  selectedTags,
  onToggle,
  onClear,
}: KeywordFilterProps) {
  const hasSelection = selectedTags.length > 0;

  return (
    <div className="py-5 border-b border-[var(--color-border)]">
      <div className="flex items-center justify-between gap-4 mb-3">
        <p className="text-xs font-medium uppercase tracking-widest text-[var(--color-muted)]">
          키워드 필터
        </p>
        {hasSelection && (
          <button
            type="button"
            onClick={onClear}
            className="text-xs text-[var(--color-muted)] hover:text-[var(--color-accent)] transition-colors shrink-0"
          >
            전체 보기
          </button>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => {
          const selected = selectedTags.includes(tag);
          return (
            <button
              key={tag}
              type="button"
              onClick={() => onToggle(tag)}
              aria-pressed={selected}
              className={`inline-block rounded-full border px-2.5 py-0.5 text-xs transition-colors cursor-pointer ${
                selected
                  ? "border-[var(--color-accent)] bg-[var(--color-accent)] text-white"
                  : "border-[var(--color-border)] bg-white text-[var(--color-muted)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
              }`}
            >
              {tag}
            </button>
          );
        })}
      </div>
    </div>
  );
}
