"use client";

import Link from "next/link";
import { useCallback } from "react";
import { RequireAuth } from "@/components/auth/RequireAuth";
import { useAuth } from "@/contexts/AuthContext";
import { useResource } from "@/hooks/useResource";
import { communityApi } from "@/lib/api/community";
import { Button } from "@/components/common/Button";
import { RightRail } from "@/components/layout/RightRail";
import { PostDetail } from "./PostDetail";

export function PostScreen({ postId }: { postId: number }) {
  const { user } = useAuth();
  const loader = useCallback(
    (signal: AbortSignal) => communityApi.post(postId, signal),
    [postId],
  );
  const { data, loading, error, reload } = useResource(
    `post:${user?.user_id}:${postId}`,
    loader,
    !!user,
  );
  return (
    <RequireAuth>
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-8 sm:px-6 xl:grid-cols-[minmax(0,1fr)_260px]">
        <main className="min-w-0">
          {loading ? (
            <p role="status" className="py-12 text-fg-muted">
              게시글을 불러오고 있어요.
            </p>
          ) : error ? (
            <div className="py-8">
              <p role="alert" className="mb-4 text-danger">
                {error}
              </p>
              <Button onClick={reload}>다시 시도</Button>
              <Link className="ml-4 text-sm underline" href="/community/all">
                목록으로
              </Link>
            </div>
          ) : (
            data && (
              <PostDetail
                key={`${user?.user_id}:${data.id}`}
                post={data}
                onRefresh={reload}
              />
            )
          )}
        </main>
        <RightRail />
      </div>
    </RequireAuth>
  );
}
