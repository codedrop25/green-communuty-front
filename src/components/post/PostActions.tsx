"use client";

import { useState } from "react";
import { Bookmark, ChevronUp, Link as LinkIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function PostActions({ initialLikeCount }: { initialLikeCount: number }) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);

  async function copyLink() {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
  }

  return (
    <div className="mt-8 flex flex-wrap gap-2 text-[13px]">
      <button type="button" aria-pressed={liked} onClick={() => setLiked((value) => !value)} className={cn("inline-flex h-8 items-center gap-1.5 rounded-md border px-3 font-medium transition-colors duration-150", liked ? "border-green-700/30 bg-brand-soft text-brand" : "border-border bg-surface text-fg-secondary hover:bg-surface-subtle") }>
        <ChevronUp aria-hidden="true" className="size-4" /> 추천 {initialLikeCount + (liked ? 1 : 0)}
      </button>
      <button type="button" aria-pressed={saved} onClick={() => setSaved((value) => !value)} className="inline-flex h-8 items-center gap-1.5 rounded-md border border-border px-3 text-fg-secondary transition-colors duration-150 hover:bg-surface-subtle">
        <Bookmark aria-hidden="true" className={cn("size-4", saved && "fill-current text-brand")} /> {saved ? "저장됨" : "저장"}
      </button>
      <button type="button" onClick={copyLink} className="inline-flex h-8 items-center gap-1.5 rounded-md border border-border px-3 text-fg-secondary transition-colors duration-150 hover:bg-surface-subtle">
        <LinkIcon aria-hidden="true" className="size-4" /> {copied ? "복사됨" : "링크 복사"}
      </button>
    </div>
  );
}
