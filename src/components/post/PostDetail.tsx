"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Avatar } from "@/components/common/Avatar";
import { Button } from "@/components/common/Button";
import { formatCount, formatRelativeTime } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { communityApi } from "@/lib/api/community";
import { errorMessage } from "@/lib/api/client";
import type { PostDetailData } from "@/types";
import { CommentSection } from "./CommentSection";
import { PostActions } from "./PostActions";
import { PostEditor } from "./PostEditor";
import { PostImages } from "./PostImages";

export function PostDetail({
  post,
  onRefresh,
}: {
  post: PostDetailData;
  onRefresh: () => void;
}) {
  const { user } = useAuth();
  const router = useRouter();
  const [editing, setEditing] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");
  const isAuthor = String(user?.user_id) === post.author.id;
  const canEdit = isAuthor || user?.user_role === "ADMIN";
  async function remove() {
    setDeleting(true);
    setError("");
    try {
      await communityApi.remove(post.id);
      router.replace("/community/all");
    } catch (error) {
      setError(errorMessage(error));
      setDeleting(false);
    }
  }
  return (
    <article>
      <Link
        href="/community/all"
        className="inline-flex min-h-8 items-center gap-1 text-[13px] text-fg-muted"
      >
        <ArrowLeft className="size-4" />
        전체 게시글
      </Link>
      <h1 className="mt-4 break-words text-2xl font-semibold leading-8 tracking-tight">
        {post.title}
      </h1>
      <div className="mt-4 flex flex-wrap items-center gap-2 text-[13px] text-fg-muted">
        <Avatar
          nickname={post.author.nickname}
          size={24}
          isCurrentUser={isAuthor}
        />
        <strong className="font-medium text-fg">{post.author.nickname}</strong>
        <span>· {formatRelativeTime(post.createdAt)}</span>
        {post.viewCount !== undefined && (
          <span>· 조회 {formatCount(post.viewCount)}</span>
        )}
        {canEdit && (
          <div className="ml-auto flex gap-1">
            <Button
              type="button"
              size="sm"
              variant="ghost"
              onClick={() => setEditing(!editing)}
            >
              수정
            </Button>
            <Button
              type="button"
              size="sm"
              variant="danger"
              onClick={() => setConfirmDelete(true)}
            >
              삭제
            </Button>
          </div>
        )}
      </div>
      {confirmDelete && (
        <div role="alert" className="mt-4 rounded-md border border-border p-4">
          <p className="mb-3 text-sm">이 게시글을 삭제할까요?</p>
          <div className="flex gap-2">
            <Button
              variant="danger"
              loading={deleting}
              onClick={() => void remove()}
            >
              삭제 확인
            </Button>
            <Button
              variant="ghost"
              disabled={deleting}
              onClick={() => setConfirmDelete(false)}
            >
              취소
            </Button>
          </div>
        </div>
      )}
      {error && (
        <p role="alert" className="mt-3 text-sm text-danger">
          {error}
        </p>
      )}
      {editing ? (
        <PostEditor
          post={post}
          onCancel={() => setEditing(false)}
          onSaved={() => {
            setEditing(false);
            onRefresh();
          }}
        />
      ) : (
        <div className="mt-8 whitespace-pre-wrap break-words text-[15px] leading-7 text-fg-body">
          {post.content.join("\n\n")}
        </div>
      )}
      <PostImages
        postId={post.id}
        hasImages={!!post.hasImage}
        canUpload={isAuthor}
        onUploaded={onRefresh}
      />
      <PostActions
        postId={post.id}
        initialLikeCount={post.likeCount ?? 0}
        initialLiked={!!post.isLiked}
      />
      <CommentSection postId={post.id} />
    </article>
  );
}
