"use client";

import { useState } from "react";
import { Avatar } from "@/components/common/Avatar";
import { Button } from "@/components/common/Button";
import { formatRelativeTime } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { communityApi } from "@/lib/api/community";
import { errorMessage } from "@/lib/api/client";
import type { Comment } from "@/types";
import { CommentForm } from "./CommentForm";

export function CommentItem({
  comment,
  postId,
  onChanged,
  isReply = false,
}: {
  comment: Comment;
  postId: number;
  onChanged: () => void;
  isReply?: boolean;
}) {
  const { user } = useAuth();
  const [mode, setMode] = useState<"read" | "edit" | "reply" | "delete">(
    "read",
  );
  const [replies, setReplies] = useState<Comment[] | null>(null);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const own = String(user?.user_id) === comment.author.id;
  const nickname = own ? user!.user_nickname : comment.author.nickname;
  async function loadReplies() {
    setPending(true);
    setError("");
    try {
      setReplies(await communityApi.replies(comment.id));
    } catch (error) {
      setError(errorMessage(error));
    } finally {
      setPending(false);
    }
  }
  async function remove() {
    setPending(true);
    setError("");
    try {
      await communityApi.removeComment(comment.id);
      onChanged();
    } catch (error) {
      setError(errorMessage(error));
    } finally {
      setPending(false);
    }
  }
  return (
    <div className={isReply ? "ml-8 mt-4" : undefined}>
      <div className="flex gap-3">
        <Avatar nickname={nickname} size={28} isCurrentUser={own} />
        <div className="min-w-0 flex-1">
          <p className="text-[13px]">
            <strong className="font-medium">{nickname}</strong>{" "}
            <span className="text-xs text-fg-muted">
              {formatRelativeTime(comment.createdAt)}
            </span>
          </p>
          {mode === "edit" ? (
            <CommentForm
              label="댓글 수정"
              initialBody={comment.body}
              onCancel={() => setMode("read")}
              onSubmit={async (body) => {
                await communityApi.updateComment(comment.id, body);
                setMode("read");
                onChanged();
              }}
            />
          ) : (
            <p className="mt-1 whitespace-pre-wrap break-words text-sm leading-6 text-fg-body">
              {comment.body}
            </p>
          )}
          <div className="mt-1.5 flex gap-3 text-xs text-fg-muted">
            {!isReply && (
              <button
                type="button"
                onClick={() => setMode(mode === "reply" ? "read" : "reply")}
                className="min-h-8 hover:text-fg"
              >
                답글
              </button>
            )}
            {own && (
              <>
                <button
                  type="button"
                  className="min-h-8 hover:text-fg"
                  onClick={() => setMode("edit")}
                >
                  수정
                </button>
                <button
                  type="button"
                  className="min-h-8 hover:text-danger"
                  onClick={() => setMode("delete")}
                >
                  삭제
                </button>
              </>
            )}
          </div>
          {mode === "delete" && (
            <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
              <span>댓글을 삭제할까요?</span>
              <Button
                size="sm"
                variant="danger"
                loading={pending}
                onClick={() => void remove()}
              >
                삭제 확인
              </Button>
              <Button size="sm" variant="ghost" onClick={() => setMode("read")}>
                취소
              </Button>
            </div>
          )}
          {mode === "reply" && (
            <CommentForm
              label="답글"
              onCancel={() => setMode("read")}
              onSubmit={async (body) => {
                await communityApi.comment(postId, body, comment.id);
                setMode("read");
                await loadReplies();
                onChanged();
              }}
            />
          )}
          {error && (
            <p role="alert" className="mt-2 text-sm text-danger">
              {error}
            </p>
          )}
          {!isReply && (comment.replyCount ?? 0) > 0 && replies === null && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              loading={pending}
              onClick={() => void loadReplies()}
            >
              답글 {comment.replyCount}개 보기
            </Button>
          )}
        </div>
      </div>
      {replies?.map((reply) => (
        <CommentItem
          key={reply.id}
          comment={reply}
          postId={postId}
          isReply
          onChanged={() => {
            void loadReplies();
            onChanged();
          }}
        />
      ))}
    </div>
  );
}
