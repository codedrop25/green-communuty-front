import Link from "next/link";
import { CategoryDot } from "@/components/common/Badge";
import { cn } from "@/lib/utils";

export function BoardNav({
  pathname,
  onNavigate,
}: {
  pathname: string;
  onNavigate?: () => void;
}) {
  const active = pathname.startsWith("/community/all");
  return (
    <div>
      <p className="mb-2 px-2.5 text-xs font-medium text-fg-muted">게시판</p>
      <Link
        href="/community/all"
        onClick={onNavigate}
        aria-current={active ? "page" : undefined}
        className={cn(
          "flex items-center gap-2.5 rounded-md px-2.5 py-2 text-sm",
          active
            ? "bg-surface font-medium shadow-sm ring-1 ring-border"
            : "hover:bg-surface-muted",
        )}
      >
        <CategoryDot boardId="all" />
        전체 게시글
      </Link>
    </div>
  );
}
