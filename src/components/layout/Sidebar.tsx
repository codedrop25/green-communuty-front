"use client";

import Link from "next/link";
import { useState } from "react";
import { LogOut, Settings } from "lucide-react";
import { Avatar } from "@/components/common/Avatar";
import { BoardNav } from "@/components/community/BoardNav";
import { useAuth } from "@/contexts/AuthContext";
import { errorMessage } from "@/lib/api/client";
import { cn } from "@/lib/utils";

export function Sidebar({
  pathname,
  mobile = false,
  onNavigate,
}: {
  pathname: string;
  mobile?: boolean;
  onNavigate?: () => void;
}) {
  const { user, loading, logout } = useAuth();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  async function signOut() {
    setPending(true);
    setError("");
    try {
      await logout();
      onNavigate?.();
    } catch (error) {
      setError(errorMessage(error));
    } finally {
      setPending(false);
    }
  }
  return (
    <aside
      className={cn(
        "flex h-full w-60 shrink-0 flex-col border-r border-border bg-surface-subtle",
        mobile ? "w-full" : "sticky top-0 hidden h-screen lg:flex",
      )}
    >
      <Link
        href="/community/all"
        onClick={onNavigate}
        className="flex h-14 items-center gap-2 px-5 font-semibold"
      >
        <span className="grid size-6 place-items-center rounded-md bg-brand text-xs text-white">
          G
        </span>
        Green Community
      </Link>
      <nav
        aria-label="주요 메뉴"
        className="mt-6 flex-1 space-y-5 overflow-y-auto px-3"
      >
        <BoardNav pathname={pathname} onNavigate={onNavigate} />
      </nav>
      {error && (
        <p role="alert" className="px-4 py-2 text-xs text-danger">
          {error}
        </p>
      )}
      <div className="border-t border-border px-4 py-4">
        {loading ? (
          <p className="text-xs text-fg-muted">확인 중…</p>
        ) : user ? (
          <>
            <div className="flex items-center gap-2">
              <Avatar nickname={user.user_nickname} size={28} isCurrentUser />
              <span className="truncate text-sm font-medium">
                {user.user_nickname}
              </span>
              <Link
                href="/community/account"
                onClick={onNavigate}
                aria-label="내 정보"
                className="ml-auto p-2"
              >
                <Settings className="size-4" />
              </Link>
            </div>
            <button
              type="button"
              disabled={pending}
              onClick={() => void signOut()}
              className="mt-3 flex items-center gap-2 text-xs text-fg-muted disabled:opacity-50"
            >
              <LogOut className="size-3.5" />
              {pending ? "로그아웃 중…" : "로그아웃"}
            </button>
          </>
        ) : (
          <Link
            href="/login"
            onClick={onNavigate}
            className="text-sm font-medium"
          >
            로그인 / 회원가입
          </Link>
        )}
      </div>
    </aside>
  );
}
