export interface HowSection {
  title: string;
  body: string;
}

export function parseHowSections(content: string): HowSection[] {
  return content
    .split(/^## /m)
    .filter(Boolean)
    .map((block) => {
      const [title, ...body] = block.split("\n");
      return { title: title.trim(), body: body.join("\n").trim() };
    });
}
