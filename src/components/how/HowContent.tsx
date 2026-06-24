"use client";

import { useMemo, useState } from "react";
import { parseHowSections } from "@/lib/howSections";
import { extractImagesFromBody } from "@/lib/howBodyParser";
import { HowSectionBody } from "@/components/how/HowSectionBody";
import { ImageLightbox } from "@/components/common/ImageLightbox";

interface HowContentProps {
  content: string;
}

export function HowContent({ content }: HowContentProps) {
  const sections = useMemo(() => parseHowSections(content), [content]);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const images = useMemo(
    () => sections.flatMap((section) => extractImagesFromBody(section.body)),
    [sections]
  );

  const sectionOffsets = useMemo(() => {
    let offset = 0;
    return sections.map((section) => {
      const current = offset;
      offset += extractImagesFromBody(section.body).length;
      return current;
    });
  }, [sections]);

  if (sections.length === 0) {
    return <p className="text-sm text-[var(--color-muted)]">{content}</p>;
  }

  return (
    <>
      <div className="space-y-8">
        {sections.map((section, index) => (
          <div key={section.title}>
            <h2 className="text-xs font-medium uppercase tracking-widest text-[var(--color-muted)] mb-3">
              {section.title}
            </h2>
            {section.body ? (
              <HowSectionBody
                body={section.body}
                imageIndexOffset={sectionOffsets[index]}
                onImageClick={setLightboxIndex}
              />
            ) : (
              <p className="text-sm text-[var(--color-muted)] italic">—</p>
            )}
          </div>
        ))}
      </div>

      <ImageLightbox
        images={images}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onChangeIndex={setLightboxIndex}
      />
    </>
  );
}
