import { ChevronUp } from "lucide-react";
import { Avatar } from "@/components/common/Avatar";
import { formatRelativeTime } from "@/lib/utils";
import type { Comment as CommentData } from "@/types";

export function CommentItem({ comment, isReply = false }: { comment: CommentData; isReply?: boolean }) {
  return (
    <div className={isReply ? "ml-10 mt-4" : undefined}>
      <div className="flex gap-3">
        <Avatar nickname={comment.author.nickname} size={28} isCurrentUser={comment.author.id === "green-thumb"} />
        <div className="min-w-0 flex-1">
          <p className="text-[13px]">
            <strong className="font-medium text-fg">{comment.author.nickname}</strong>{" "}
            <span className="text-xs text-fg-muted">{formatRelativeTime(comment.createdAt)}</span>
          </p>
          <p className="mt-1 text-sm leading-5 text-fg-body">{comment.body}</p>
          <div className="mt-1.5 flex gap-3 text-xs text-fg-muted">
            <button type="button" className="inline-flex min-h-8 items-center gap-1 hover:text-fg"><ChevronUp aria-hidden="true" className="size-3.5" />{comment.likeCount}</button>
            <button type="button" className="min-h-8 hover:text-fg">답글</button>
          </div>
        </div>
      </div>
      {comment.replies.map((reply) => <CommentItem key={reply.id} comment={reply} isReply />)}
    </div>
  );
}
