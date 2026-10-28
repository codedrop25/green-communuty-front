"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/common/Button";
import { FieldLabel, Input, Textarea } from "@/components/common/FormControls";
import { communityApi } from "@/lib/api/community";
import { errorMessage } from "@/lib/api/client";
import type { PostDetailData } from "@/types";

export function PostEditor({
  post,
  onSaved,
  onCancel,
}: {
  post?: PostDetailData;
  onSaved?: () => void;
  onCancel?: () => void;
}) {
  const router = useRouter();
  const [title, setTitle] = useState(post?.title ?? "");
  const [content, setContent] = useState(post?.content.join("\n\n") ?? "");
  const [mode, setMode] = useState<"write" | "preview">("write");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    if (!title.trim() || !content.trim()) {
      setError("제목과 본문을 입력해주세요.");
      return;
    }
    setPending(true);
    try {
      if (post) {
        await communityApi.update(post.id, title.trim(), content.trim());
        onSaved?.();
      } else {
        const created = await communityApi.create(title.trim(), content.trim());
        router.replace(`/community/all/${created.id}`);
      }
    } catch (error) {
      setError(errorMessage(error));
    } finally {
      setPending(false);
    }
  }
  return (
    <form className="mt-6 space-y-5" onSubmit={submit}>
      <fieldset disabled={pending} className="space-y-5">
        <div>
          <div className="flex justify-between">
            <FieldLabel htmlFor="post-title">제목</FieldLabel>
            <span className="text-xs text-fg-muted">{title.length}/200</span>
          </div>
          <Input
            id="post-title"
            className="mt-1.5"
            maxLength={200}
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목을 입력해주세요"
          />
        </div>
        <div>
          <div className="flex items-center justify-between">
            <FieldLabel htmlFor="post-content">본문</FieldLabel>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setMode(mode === "write" ? "preview" : "write")}
            >
              {mode === "write" ? "미리보기" : "작성으로 돌아가기"}
            </Button>
          </div>
          {mode === "write" ? (
            <Textarea
              id="post-content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={12}
              required
              placeholder="나누고 싶은 이야기를 입력해주세요"
              className="mt-1.5 leading-6"
            />
          ) : (
            <div className="mt-1.5 min-h-72 whitespace-pre-wrap break-words rounded-md border border-border p-3 leading-7">
              {content || "미리 볼 내용이 없어요."}
            </div>
          )}
          <p className="mt-2 text-xs text-fg-muted">
            이미지는 게시글을 저장한 뒤 상세 화면에서 첨부할 수 있어요.
          </p>
        </div>
      </fieldset>
      {error && (
        <p role="alert" className="text-sm text-danger">
          {error}
        </p>
      )}
      <div className="flex justify-end gap-2 border-t border-border pt-5">
        {onCancel ? (
          <Button
            type="button"
            variant="ghost"
            disabled={pending}
            onClick={onCancel}
          >
            취소
          </Button>
        ) : (
          <Link href="/community/all" className="px-3 py-1.5 text-sm">
            취소
          </Link>
        )}
        <Button type="submit" variant="brand" loading={pending}>
          {post ? "수정 저장" : "게시하기"}
        </Button>
      </div>
    </form>
  );
}
