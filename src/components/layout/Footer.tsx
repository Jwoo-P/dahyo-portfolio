export function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)]">
      <div className="mx-auto max-w-3xl px-5 py-8">
        <p className="text-xs text-[var(--color-muted)]">
          © <span suppressHydrationWarning>{new Date().getFullYear()}</span>{" "}
          박다효
        </p>
      </div>
    </footer>
  );
}
