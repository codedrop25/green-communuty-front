"use client";

import { useCallback, useState } from "react";
import { communityApi } from "@/lib/api/community";
import { useResource } from "@/hooks/useResource";
import { Button } from "@/components/common/Button";
import { CommentForm } from "./CommentForm";
import { CommentList } from "./CommentList";

export function CommentSection({ postId }: { postId: number }) {
  const [page, setPage] = useState(1);
  const loader = useCallback(
    (signal: AbortSignal) => communityApi.comments(postId, page, signal),
    [postId, page],
  );
  const { data, loading, error, reload } = useResource(
    `comments:${postId}:${page}`,
    loader,
  );
  return (
    <section className="mt-10 border-t border-border pt-6">
      <h2 className="text-base font-semibold">
        댓글{data ? ` · ${data.total}` : ""}
      </h2>
      <CommentForm
        onSubmit={async (body) => {
          await communityApi.comment(postId, body);
          setPage(1);
          reload();
        }}
      />
      {loading ? (
        <p role="status" className="mt-6 text-sm text-fg-muted">
          댓글을 불러오는 중…
        </p>
      ) : error ? (
        <div className="mt-4">
          <p role="alert" className="mb-2 text-sm text-danger">
            {error}
          </p>
          <Button onClick={reload}>다시 시도</Button>
        </div>
      ) : (
        data && (
          <>
            {data.items.length ? (
              <CommentList
                comments={data.items}
                postId={postId}
                onChanged={reload}
              />
            ) : (
              <p className="mt-6 text-sm text-fg-muted">
                첫 댓글을 남겨보세요.
              </p>
            )}
            <div className="mt-6 flex items-center justify-end gap-3">
              {page > 1 && (
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => setPage(page - 1)}
                >
                  이전 댓글
                </Button>
              )}
              <span className="text-xs text-fg-muted">
                {page} / {Math.max(1, data.total_pages)}
              </span>
              {page < data.total_pages && (
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => setPage(page + 1)}
                >
                  다음 댓글
                </Button>
              )}
            </div>
          </>
        )
      )}
    </section>
  );
}
