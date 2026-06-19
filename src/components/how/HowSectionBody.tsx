const IMAGE_REGEX = /!\[([^\]]*)\]\(([^)]+)\)/;

function parseSegments(body: string) {
  return body.split(/(!\[[^\]]*\]\([^)]+\))/g).filter(Boolean);
}

export function HowSectionBody({ body }: { body: string }) {
  const segments = parseSegments(body);

  return (
    <div className="space-y-4">
      {segments.map((segment, index) => {
        const imageMatch = segment.match(IMAGE_REGEX);
        if (imageMatch) {
          const [, alt, src] = imageMatch;
          return (
            <figure key={index} className="my-6">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={alt}
                className="w-full rounded-lg border border-[var(--color-border)] bg-white"
              />
              {alt ? (
                <figcaption className="mt-2 text-center text-xs text-[var(--color-muted)]">
                  {alt}
                </figcaption>
              ) : null}
            </figure>
          );
        }

        const text = segment.trim();
        if (!text) return null;

        return (
          <p
            key={index}
            className="text-sm leading-relaxed text-[var(--color-muted)] whitespace-pre-line"
          >
            {text}
          </p>
        );
      })}
    </div>
  );
}
