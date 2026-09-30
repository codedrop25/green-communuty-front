import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function Pagination({ currentCount, totalCount }: { currentCount: number; totalCount: number }) {
  return (
    <nav aria-label="게시글 페이지" className="mt-4 flex items-center justify-between text-xs text-fg-muted">
      <span>{`1–${currentCount} / ${totalCount.toLocaleString("ko-KR")}`}</span>
      <div className="flex gap-1">
        <span aria-disabled="true" className="inline-flex h-7 cursor-not-allowed items-center gap-1 rounded-md border border-border px-2.5 opacity-50">
          <ChevronLeft aria-hidden="true" className="size-3.5" /> 이전
        </span>
        <Link href="?page=2" className="inline-flex h-7 items-center gap-1 rounded-md border border-border bg-surface px-2.5 text-fg transition-colors duration-150 hover:bg-surface-subtle">
          다음 <ChevronRight aria-hidden="true" className="size-3.5" />
        </Link>
      </div>
    </nav>
  );
}
