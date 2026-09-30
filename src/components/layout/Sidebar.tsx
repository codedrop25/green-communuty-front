import Link from "next/link";
import { Bookmark, History, Home, Search, Settings, TrendingUp } from "lucide-react";
import { Avatar } from "@/components/common/Avatar";
import { BoardNav } from "@/components/community/BoardNav";
import { cn } from "@/lib/utils";

const feedItems = [
  { label: "홈 피드", href: "/community/free", icon: Home },
  { label: "인기글", href: "/community/free?sort=popular", icon: TrendingUp },
  { label: "북마크", href: "/community/free?view=bookmarks", icon: Bookmark },
  { label: "내 활동", href: "/community/free?view=activity", icon: History },
];

export function Sidebar({
  pathname,
  mobile = false,
  onNavigate,
}: {
  pathname: string;
  mobile?: boolean;
  onNavigate?: () => void;
}) {
  return (
    <aside
      className={cn(
        "flex h-full w-60 shrink-0 flex-col border-r border-border bg-surface-subtle",
        mobile ? "w-full" : "sticky top-0 hidden h-screen lg:flex",
      )}
    >
      <Link href="/community/free" onClick={onNavigate} className="flex h-14 items-center gap-2 px-5 font-semibold text-fg">
        <span className="grid size-6 place-items-center rounded-md bg-brand text-xs font-semibold text-white">G</span>
        Green Community
      </Link>

      <div className="px-3">
        <button type="button" className="flex w-full items-center gap-2 rounded-md border border-border bg-surface px-2.5 py-1.5 text-fg-muted shadow-xs transition-colors duration-150 hover:bg-surface-muted">
          <Search aria-hidden="true" className="size-4" strokeWidth={1.75} />
          검색
          <kbd className="ml-auto rounded border border-border px-1 text-[11px]">⌘K</kbd>
        </button>
      </div>

      <nav aria-label="주요 메뉴" className="mt-5 flex-1 space-y-5 overflow-y-auto px-3">
        <div className="space-y-0.5">
          {feedItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = index === 0 && pathname.startsWith("/community/");
            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={onNavigate}
                className={cn(
                  "flex items-center gap-2.5 rounded-md px-2.5 py-1.5 text-sm transition-colors duration-150",
                  isActive ? "bg-zinc-200/60 font-medium text-fg" : "text-fg-secondary hover:bg-surface-muted",
                )}
              >
                <Icon aria-hidden="true" className="size-4" strokeWidth={1.75} />
                {item.label}
              </Link>
            );
          })}
        </div>
        <BoardNav pathname={pathname} onNavigate={onNavigate} />
      </nav>

      <div className="flex items-center gap-2 border-t border-border px-4 py-3">
        <Avatar nickname="초록손" size={28} isCurrentUser />
        <div className="text-xs">
          <p className="font-medium text-fg">초록손</p>
          <p className="text-fg-muted">Lv.3 새싹</p>
        </div>
        <button type="button" aria-label="설정" className="ml-auto grid size-8 place-items-center rounded-md text-fg-muted transition-colors duration-150 hover:bg-surface-muted">
          <Settings aria-hidden="true" className="size-4" strokeWidth={1.75} />
        </button>
      </div>
    </aside>
  );
}
