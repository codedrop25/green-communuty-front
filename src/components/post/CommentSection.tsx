"use client";

import { useState } from "react";
import { CommentForm } from "./CommentForm";
import { CommentList } from "./CommentList";
import type { Comment as CommentData } from "@/types";

export function CommentSection({ initialComments, totalCount }: { initialComments: CommentData[]; totalCount: number }) {
  const [comments, setComments] = useState(initialComments);

  function addComment(body: string) {
    setComments((current) => [
      {
        id: Date.now(),
        author: { id: "green-thumb", nickname: "초록손" },
        createdAt: new Date().toISOString(),
        body,
        likeCount: 0,
        replies: [],
      },
      ...current,
    ]);
  }

  return (
    <section className="mt-10 border-t border-border pt-6">
      <h2 className="text-base font-semibold text-fg">댓글 {totalCount + comments.length - initialComments.length}</h2>
      <CommentForm onSubmit={addComment} />
      <CommentList comments={comments} />
    </section>
  );
}
