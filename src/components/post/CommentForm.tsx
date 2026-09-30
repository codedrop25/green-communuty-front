"use client";

import { useState } from "react";
import { Button } from "@/components/common/Button";

export function CommentForm({ onSubmit }: { onSubmit: (body: string) => void }) {
  const [body, setBody] = useState("");

  return (
    <form
      className="mt-4 rounded-lg border border-border transition-colors duration-150 focus-within:border-border-strong focus-within:ring-4 focus-within:ring-surface-muted"
      onSubmit={(event) => {
        event.preventDefault();
        const trimmed = body.trim();
        if (!trimmed) return;
        onSubmit(trimmed);
        setBody("");
      }}
    >
      <label htmlFor="comment-body" className="sr-only">댓글</label>
      <textarea id="comment-body" value={body} onChange={(event) => setBody(event.target.value)} rows={2} placeholder="댓글을 입력해주세요" className="w-full resize-none rounded-lg bg-transparent p-3 text-sm text-fg outline-none placeholder:text-fg-subtle" />
      <div className="flex justify-end p-2">
        <Button size="sm" disabled={!body.trim()}>등록</Button>
      </div>
    </form>
  );
}
