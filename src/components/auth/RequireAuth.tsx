"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/common/Button";

export function RequireAuth({ children }: { children: React.ReactNode }) {
  const { user, loading, error, reload } = useAuth();
  const pathname = usePathname();
  if (loading)
    return (
      <p role="status" className="p-8 text-fg-muted">
        로그인 정보를 확인하고 있어요.
      </p>
    );
  if (error)
    return (
      <div className="p-8">
        <p role="alert" className="mb-3 text-danger">
          {error}
        </p>
        <Button onClick={() => void reload()}>다시 시도</Button>
      </div>
    );
  if (!user)
    return (
      <div className="mx-auto max-w-lg px-6 py-16 text-center">
        <h1 className="text-xl font-semibold">로그인이 필요해요</h1>
        <p className="mt-2 text-fg-muted">
          로그인하고 커뮤니티 이야기에 참여하세요.
        </p>
        <Link
          className="mt-6 inline-flex rounded-md bg-primary px-4 py-2 text-white"
          href={`/login?next=${encodeURIComponent(pathname)}`}
        >
          로그인
        </Link>
      </div>
    );
  return children;
}
