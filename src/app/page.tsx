import Link from "next/link";
import { getAbout } from "@/lib/about";
import { Section } from "@/components/common/Section";
import { Tag } from "@/components/common/Tag";

export default function HomePage() {
  const about = getAbout();

  return (
    <div className="mx-auto max-w-3xl px-5">
      <section className="py-16 border-b border-[var(--color-border)]">
        <h1 className="text-3xl font-semibold tracking-tight mb-2">
          {about.name}
        </h1>
        <p className="text-[var(--color-muted)] mb-6">{about.headline}</p>
        <Link
          href="/portfolio/what"
          className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-accent)] px-5 py-2 text-sm font-medium hover:bg-[var(--color-accent)] hover:text-white transition-colors"
        >
          포트폴리오 보기
          <span aria-hidden>→</span>
        </Link>
      </section>

      <Section title="About">
        {about.bio.split("\n").map((paragraph, i) => (
          <p
            key={i}
            className="text-sm leading-relaxed text-[var(--color-muted)] mb-4 last:mb-0"
          >
            {paragraph.trim()}
          </p>
        ))}
      </Section>

      <Section title="Experience">
        <div className="space-y-6">
          {about.experiences.map((exp) => (
            <div key={exp.company + exp.period}>
              <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1">
                <h3 className="text-sm font-medium">{exp.company}</h3>
                <span className="text-xs text-[var(--color-muted)]">
                  {exp.period}
                </span>
              </div>
              <p className="text-xs text-[var(--color-muted)] mb-1">
                {exp.role}
              </p>
              {exp.description && (
                <p className="text-sm text-[var(--color-muted)] leading-relaxed">
                  {exp.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </Section>

      <Section title="Skills">
        <div className="flex flex-wrap gap-2">
          {about.skills.map((skill) => (
            <Tag key={skill}>{skill}</Tag>
          ))}
        </div>
      </Section>
    </div>
  );
}
