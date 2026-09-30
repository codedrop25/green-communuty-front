import type { BoardId } from "@/types";
import { cn } from "@/lib/utils";

export function NoticeBadge() {
  return (
    <span className="shrink-0 rounded bg-brand-soft px-1.5 py-0.5 text-[11px] font-semibold text-brand">
      공지
    </span>
  );
}

export function NewBadge() {
  return <span className="shrink-0 text-[11px] font-semibold text-brand">NEW</span>;
}

export function CategoryBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded border border-border px-1.5 py-0.5 text-[11px] text-fg-secondary">
      {children}
    </span>
  );
}

const dots: Record<BoardId, string> = {
  all: "bg-cat-all",
  free: "bg-cat-free",
  qna: "bg-cat-qna",
  info: "bg-cat-info",
  review: "bg-cat-review",
};

export function CategoryDot({ boardId, className }: { boardId: BoardId; className?: string }) {
  return <span aria-hidden="true" className={cn("size-2 shrink-0 rounded-full", dots[boardId], className)} />;
}
