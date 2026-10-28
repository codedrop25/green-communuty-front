"use client";

import Link from "next/link";
import { Menu, PenLine } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export function Topbar({
  pathname,
  onOpenMenu,
}: {
  pathname: string;
  onOpenMenu: () => void;
}) {
  const { user } = useAuth();
  const title =
    pathname === "/community/write"
      ? "새 글 작성"
      : pathname === "/community/account"
        ? "내 정보"
        : pathname.split("/").length > 3
          ? "게시글"
          : "전체 게시글";
  return (
    <header className="sticky top-0 z-20 flex h-14 items-center gap-3 border-b border-border bg-white/90 px-4 backdrop-blur sm:px-6">
      <button
        type="button"
        aria-label="메뉴 열기"
        onClick={onOpenMenu}
        className="grid size-10 place-items-center rounded-md text-fg-secondary hover:bg-surface-muted lg:hidden"
      >
        <Menu className="size-5" />
      </button>
      <Link
        href="/community/all"
        className="flex items-center gap-2 font-semibold lg:hidden"
      >
        <span className="grid size-6 place-items-center rounded-md bg-brand text-xs text-white">
          G
        </span>
        <span className="hidden sm:inline">Green Community</span>
      </Link>
      <p className="hidden text-[13px] text-fg-muted lg:block">
        커뮤니티 <span className="mx-1">/</span>{" "}
        <strong className="font-medium text-fg">{title}</strong>
      </p>
      <div className="ml-auto">
        {user ? (
          pathname !== "/community/write" && (
            <Link
              href="/community/write"
              className="inline-flex h-8 items-center gap-1.5 rounded-md bg-primary px-3 text-[13px] font-medium text-white hover:bg-primary-hover"
            >
              <PenLine className="size-4" />새 글 작성
            </Link>
          )
        ) : (
          <Link href="/login" className="text-sm font-medium">
            로그인
          </Link>
        )}
      </div>
    </header>
  );
}
