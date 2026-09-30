import Link from "next/link";
import { boards } from "@/lib/mock-community";
import { cn } from "@/lib/utils";
import { CategoryDot } from "@/components/common/Badge";

export function BoardNav({ pathname, onNavigate }: { pathname: string; onNavigate?: () => void }) {
  return (
    <div>
      <p className="mb-1 px-2.5 text-xs font-medium text-fg-muted">게시판</p>
      <div className="space-y-0.5">
        {boards.map((board) => {
          const href = `/community/${board.id}`;
          const isActive = pathname === href || pathname.startsWith(`${href}/`);

          return (
            <Link
              key={board.id}
              href={href}
              onClick={onNavigate}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "flex items-center gap-2.5 rounded-md px-2.5 py-1.5 text-sm transition-colors duration-150",
                isActive
                  ? "bg-surface font-medium text-fg shadow-sm ring-1 ring-border"
                  : "text-fg-secondary hover:bg-surface-muted",
              )}
            >
              <CategoryDot boardId={board.id} />
              <span>{board.name}</span>
              <span className="ml-auto text-xs tabular-nums text-fg-muted">
                {board.count.toLocaleString("ko-KR")}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
