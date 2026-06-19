export function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block rounded-full border border-[var(--color-border)] bg-white px-2.5 py-0.5 text-xs text-[var(--color-muted)]">
      {children}
    </span>
  );
}
