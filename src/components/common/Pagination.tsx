import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function Pagination({
  page,
  size,
  currentCount,
  totalCount,
  totalPages,
  href,
}: {
  page: number;
  size: number;
  currentCount: number;
  totalCount: number;
  totalPages: number;
  href: string;
}) {
  const start = currentCount ? (page - 1) * size + 1 : 0;
  const end = currentCount ? start + currentCount - 1 : 0;
  const linkClass =
    "inline-flex h-8 items-center gap-1 rounded-md border border-border px-2.5 hover:bg-surface-subtle";
  return (
    <nav
      aria-label="게시글 페이지"
      className="mt-5 flex items-center justify-between text-xs text-fg-muted"
    >
      <span>
        {start}–{end} / {totalCount.toLocaleString("ko-KR")}
      </span>
      <div className="flex items-center gap-2">
        {page > 1 && (
          <Link href={`${href}?page=${page - 1}`} className={linkClass}>
            <ChevronLeft aria-hidden="true" className="size-3.5" />
            이전
          </Link>
        )}
        <span>
          {page} / {Math.max(1, totalPages)}
        </span>
        {page < totalPages && (
          <Link href={`${href}?page=${page + 1}`} className={linkClass}>
            다음
            <ChevronRight aria-hidden="true" className="size-3.5" />
          </Link>
        )}
      </div>
    </nav>
  );
}
