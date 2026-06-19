import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-24 text-center">
      <h1 className="text-2xl font-semibold mb-3">페이지를 찾을 수 없습니다</h1>
      <p className="text-sm text-[var(--color-muted)] mb-6">
        요청하신 페이지가 존재하지 않습니다.
      </p>
      <Link
        href="/"
        className="text-sm font-medium hover:opacity-70 transition-opacity"
      >
        홈으로 돌아가기
      </Link>
    </div>
  );
}
