export function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)]">
      <div className="mx-auto max-w-3xl px-5 py-8">
        <p className="text-xs text-[var(--color-muted)]">
          © {new Date().getFullYear()} 박다효
        </p>
      </div>
    </footer>
  );
}
