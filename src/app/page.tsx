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

      <Section title="Skills">
        <div className="flex flex-wrap gap-2">
          {about.skills.map((skill) => (
            <Tag key={skill}>{skill}</Tag>
          ))}
        </div>
      </Section>

      <Section title="Experience">
        <div className="space-y-6">
          {about.experiences.map((exp) => (
            <div key={exp.company + exp.period}>
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5 mb-2">
                <h3 className="text-sm font-medium">{exp.company}</h3>
                {exp.keywords?.map((keyword) => (
                  <Tag key={`${exp.company}-${keyword}`}>{keyword}</Tag>
                ))}
              </div>
              <p className="text-xs text-[var(--color-muted)] mb-2">
                {exp.period}
              </p>
              <p className="text-xs text-[var(--color-muted)] mb-2">
                {exp.role}
              </p>
              {exp.description && (
                <p className="text-sm text-[var(--color-muted)] leading-relaxed mb-2">
                  {exp.description}
                </p>
              )}
              {exp.tasks && exp.tasks.length > 0 && (
                <ul className="text-sm text-[var(--color-muted)] leading-relaxed list-disc pl-4 space-y-1">
                  {exp.tasks.map((task) => (
                    <li key={task}>{task}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </Section>

      {about.education && about.education.length > 0 && (
        <Section title="Education">
          <div className="space-y-6">
            {about.education.map((edu) => (
              <div key={edu.school + edu.period}>
                <h3 className="text-sm font-medium mb-2">{edu.school}</h3>
                <p className="text-xs text-[var(--color-muted)] mb-2">
                  {edu.period}
                </p>
                <p className="text-sm text-[var(--color-muted)]">{edu.major}</p>
              </div>
            ))}
          </div>
        </Section>
      )}

      {about.certifications && about.certifications.length > 0 && (
        <Section title="Certifications">
          <div className="space-y-6">
            {about.certifications.map((cert) => (
              <div key={cert.name + cert.period}>
                <h3 className="text-sm font-medium mb-2">{cert.name}</h3>
                <p className="text-xs text-[var(--color-muted)]">
                  {cert.period}
                </p>
              </div>
            ))}
          </div>
        </Section>
      )}
    </div>
  );
}
