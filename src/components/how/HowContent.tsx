import { parseHowSections } from "@/lib/howSections";
import { HowSectionBody } from "@/components/how/HowSectionBody";

interface HowContentProps {
  content: string;
}

export function HowContent({ content }: HowContentProps) {
  const sections = parseHowSections(content);

  if (sections.length === 0) {
    return <p className="text-sm text-[var(--color-muted)]">{content}</p>;
  }

  return (
    <div className="space-y-8">
      {sections.map((section) => (
        <div key={section.title}>
          <h2 className="text-xs font-medium uppercase tracking-widest text-[var(--color-muted)] mb-3">
            {section.title}
          </h2>
          {section.body ? (
            <HowSectionBody body={section.body} />
          ) : (
            <p className="text-sm text-[var(--color-muted)] italic">—</p>
          )}
        </div>
      ))}
    </div>
  );
}
