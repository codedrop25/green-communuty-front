import Link from "next/link";
import { Bell, Menu, PenLine } from "lucide-react";
import { boards } from "@/lib/mock-community";

export function Topbar({ pathname, onOpenMenu }: { pathname: string; onOpenMenu: () => void }) {
  const boardId = pathname.split("/")[2];
  const board = boards.find((item) => item.id === boardId) ?? boards[1];
  const isWrite = pathname === "/community/write";
  const isDetail = pathname.split("/").length > 3;

  return (
    <header className="sticky top-0 z-20 flex h-14 items-center gap-3 border-b border-border bg-white/90 px-4 backdrop-blur sm:px-6">
      <button type="button" aria-label="메뉴 열기" onClick={onOpenMenu} className="grid size-10 place-items-center rounded-md text-fg-secondary transition-colors duration-150 hover:bg-surface-muted lg:hidden">
        <Menu aria-hidden="true" className="size-5" strokeWidth={1.75} />
      </button>
      <Link href="/community/free" className="flex items-center gap-2 font-semibold text-fg lg:hidden">
        <span className="grid size-6 place-items-center rounded-md bg-brand text-xs text-white">G</span>
        <span className="hidden sm:inline">Green Community</span>
      </Link>
      <p className="hidden text-[13px] text-fg-muted lg:block">
        게시판 <span className="mx-1 text-fg-subtle">/</span>{" "}
        <strong className="font-medium text-fg">{isWrite ? "새 글 작성" : isDetail ? "게시글" : board.name}</strong>
      </p>
      <div className="ml-auto flex items-center gap-2">
        <button type="button" aria-label="알림" className="grid size-8 place-items-center rounded-md text-fg-muted transition-colors duration-150 hover:bg-surface-muted">
          <Bell aria-hidden="true" className="size-5" strokeWidth={1.75} />
        </button>
        {!isWrite && (
          <Link href={`/community/write?board=${board.id}`} className="inline-flex h-8 items-center gap-1.5 rounded-md bg-primary px-3 text-[13px] font-medium text-white transition-colors duration-150 hover:bg-primary-hover">
            <PenLine aria-hidden="true" className="size-4" strokeWidth={1.75} />
            새 글 작성
          </Link>
        )}
      </div>
    </header>
  );
}
