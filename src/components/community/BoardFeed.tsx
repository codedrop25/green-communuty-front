"use client";

import { useCallback } from "react";
import { communityApi } from "@/lib/api/community";
import { useResource } from "@/hooks/useResource";
import { useAuth } from "@/contexts/AuthContext";
import { RequireAuth } from "@/components/auth/RequireAuth";
import { Button } from "@/components/common/Button";
import { EmptyState } from "@/components/common/EmptyState";
import { Pagination } from "@/components/common/Pagination";
import { PostListSkeleton } from "@/components/common/Skeleton";
import { PostList } from "@/components/post/PostList";
import { RightRail } from "@/components/layout/RightRail";

export function BoardFeed({ page }: { page: number }) {
  const { user } = useAuth();
  const loader = useCallback(
    (signal: AbortSignal) => communityApi.posts(page, signal),
    [page],
  );
  const { data, error, loading, reload } = useResource(
    `posts:${user?.user_id}:${page}`,
    loader,
    !!user,
  );
  return (
    <RequireAuth>
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-8 sm:px-6 xl:grid-cols-[minmax(0,1fr)_260px]">
        <main className="min-w-0">
          <h1 className="text-xl font-semibold tracking-tight">전체 게시글</h1>
          <p className="mt-1 text-fg-muted">이웃과 나누는 일상의 이야기</p>
          <div className="mt-6 flex items-center justify-between text-sm">
            <span className="font-medium">최신순</span>
            {data && (
              <span className="text-fg-muted">
                {data.total.toLocaleString("ko-KR")}개의 글
              </span>
            )}
          </div>
          {loading ? (
            <PostListSkeleton />
          ) : error ? (
            <div className="mt-6">
              <p role="alert" className="mb-3 text-danger">
                {error}
              </p>
              <Button onClick={reload}>다시 시도</Button>
            </div>
          ) : (
            data && (
              <>
                {data.items.length || data.notices.length ? (
                  <PostList posts={data.items} notices={data.notices} />
                ) : (
                  <EmptyState />
                )}
                <Pagination
                  page={data.page}
                  size={data.size}
                  currentCount={data.items.length}
                  totalCount={data.total}
                  totalPages={data.total_pages}
                  href="/community/all"
                />
              </>
            )
          )}
        </main>
        <RightRail />
      </div>
    </RequireAuth>
  );
}
