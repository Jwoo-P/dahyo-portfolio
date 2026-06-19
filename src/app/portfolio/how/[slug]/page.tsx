import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProjectBySlug, getAllProjectSlugs } from "@/lib/projects";
import { getHowBySlug } from "@/lib/how";
import { BackLink } from "@/components/common/BackLink";
import { Tag } from "@/components/common/Tag";
import { HowContent } from "@/components/how/HowContent";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Not Found" };
  return {
    title: `${project.title} — How | 박다효 Portfolio`,
    description: project.summary,
  };
}

export default async function HowPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const how = getHowBySlug(slug);
  const isDraft = project.howStatus === "draft" || how?.status === "draft";

  return (
    <div className="mx-auto max-w-3xl px-5">
      <div className="py-8">
        <BackLink href="/portfolio/what" label="What으로 돌아가기" />
      </div>

      <section className="pb-10 border-b border-[var(--color-border)]">
        <p className="text-xs font-medium uppercase tracking-widest text-[var(--color-muted)] mb-2">
          How
        </p>
        <h1 className="text-2xl font-semibold tracking-tight mb-2">
          {project.title}
        </h1>
        <p className="text-sm text-[var(--color-muted)] mb-4">
          {project.period} · {project.role}
          {project.category === "company" && (
            <span> · {project.company}</span>
          )}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
      </section>

      {isDraft ? (
        <section className="py-16 text-center">
          <div className="rounded-lg border border-dashed border-[var(--color-border)] bg-white px-8 py-12">
            <p className="text-sm text-[var(--color-muted)]">
              상세 내용을 준비 중입니다.
            </p>
            <p className="text-xs text-[var(--color-muted)] mt-2">
              노션 정리 후 업데이트될 예정입니다.
            </p>
          </div>
        </section>
      ) : (
        <article className="py-10 prose prose-sm prose-neutral max-w-none">
          <HowContent content={how!.content} />
        </article>
      )}
    </div>
  );
}
