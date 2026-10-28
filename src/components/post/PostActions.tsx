"use client";

import { useState } from "react";
import { ChevronUp, Link as LinkIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { communityApi } from "@/lib/api/community";
import { errorMessage } from "@/lib/api/client";

export function PostActions({
  postId,
  initialLikeCount,
  initialLiked,
}: {
  postId: number;
  initialLikeCount: number;
  initialLiked: boolean;
}) {
  const [liked, setLiked] = useState(initialLiked);
  const [count, setCount] = useState(initialLikeCount);
  const [pending, setPending] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");
  async function toggleLike() {
    setPending(true);
    setError("");
    try {
      await communityApi.like(postId, !liked);
      setCount((value) => Math.max(0, value + (liked ? -1 : 1)));
      setLiked(!liked);
    } catch (error) {
      setError(errorMessage(error));
    } finally {
      setPending(false);
    }
  }
  async function copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setError("");
    } catch {
      setError("링크를 복사하지 못했어요. 주소창의 주소를 복사해주세요.");
    }
  }
  return (
    <div className="mt-8">
      <div className="flex flex-wrap gap-2 text-[13px]">
        <button
          type="button"
          aria-pressed={liked}
          disabled={pending}
          onClick={() => void toggleLike()}
          className={cn(
            "inline-flex h-8 items-center gap-1.5 rounded-md border px-3 font-medium disabled:opacity-50",
            liked
              ? "border-green-700/30 bg-brand-soft text-brand"
              : "border-border text-fg-secondary hover:bg-surface-subtle",
          )}
        >
          <ChevronUp className="size-4" />
          추천 {count}
        </button>
        <button
          type="button"
          onClick={() => void copyLink()}
          className="inline-flex h-8 items-center gap-1.5 rounded-md border border-border px-3 text-fg-secondary hover:bg-surface-subtle"
        >
          <LinkIcon className="size-4" />
          {copied ? "복사됨" : "링크 복사"}
        </button>
      </div>
      {error && (
        <p role="alert" className="mt-3 text-sm text-danger">
          {error}
        </p>
      )}
    </div>
  );
}
