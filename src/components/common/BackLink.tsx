import Link from "next/link";

export function BackLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-1 text-sm text-[var(--color-muted)] hover:text-[var(--color-accent)] transition-colors"
    >
      <span aria-hidden>←</span>
      {label}
    </Link>
  );
}
