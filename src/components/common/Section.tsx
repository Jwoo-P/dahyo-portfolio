interface SectionProps {
  title: string;
  children: React.ReactNode;
}

export function Section({ title, children }: SectionProps) {
  return (
    <section className="py-10 border-b border-[var(--color-border)] last:border-b-0">
      <h2 className="mb-5 text-xs font-medium uppercase tracking-widest text-[var(--color-muted)]">
        {title}
      </h2>
      {children}
    </section>
  );
}
