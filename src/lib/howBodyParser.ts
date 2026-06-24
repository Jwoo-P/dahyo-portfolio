const IMAGE_REGEX = /!\[([^\]]*)\]\(([^)]+)\)/;

export type HowBodySegment =
  | { type: "text"; content: string; key: string }
  | { type: "image"; alt: string; src: string; imageIndex: number; key: string };

export function parseHowBodySegments(
  body: string,
  imageIndexOffset = 0
): HowBodySegment[] {
  const raw = body.split(/(!\[[^\]]*\]\([^)]+\))/g).filter(Boolean);
  let imageIndex = imageIndexOffset;

  return raw.map((segment, index) => {
    const imageMatch = segment.match(IMAGE_REGEX);
    if (imageMatch) {
      const [, alt, src] = imageMatch;
      const currentIndex = imageIndex;
      imageIndex += 1;
      return {
        type: "image" as const,
        alt,
        src,
        imageIndex: currentIndex,
        key: `img-${index}`,
      };
    }

    return {
      type: "text" as const,
      content: segment,
      key: `text-${index}`,
    };
  });
}

export function extractImagesFromBody(body: string) {
  const images: { alt: string; src: string }[] = [];
  const regex = /!\[([^\]]*)\]\(([^)]+)\)/g;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(body)) !== null) {
    images.push({ alt: match[1], src: match[2] });
  }

  return images;
}
