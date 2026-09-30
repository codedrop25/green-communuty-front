import Link from "next/link";
import { ChevronUp, ImageIcon, MessageSquare } from "lucide-react";
import { CategoryDot, NewBadge } from "@/components/common/Badge";
import { boards } from "@/lib/mock-community";
import { formatCount, formatRelativeTime } from "@/lib/utils";
import type { PostSummary } from "@/types";

export function PostListItem({ post }: { post: PostSummary }) {
  const board = boards.find((item) => item.id === post.boardId);

  return (
    <li>
      <Link href={`/community/${post.boardId}/${post.id}`} className="group flex items-center gap-4 px-4 py-3 transition-colors duration-150 hover:bg-surface-subtle">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <CategoryDot boardId={post.boardId} className="size-1.5" />
            <h2 className="truncate font-medium text-fg">{post.title}</h2>
            {post.hasImage && <ImageIcon aria-label="이미지 포함" className="size-3.5 shrink-0 text-fg-subtle" strokeWidth={1.75} />}
            {post.isNew && <NewBadge />}
          </div>
          <p className="mt-1 pl-3.5 text-xs text-fg-muted">
            {board?.name} · {post.author.nickname} · {formatRelativeTime(post.createdAt)}
          </p>
        </div>
        <div className="hidden shrink-0 items-center gap-4 text-xs tabular-nums text-fg-muted sm:flex">
          <span className="flex w-10 items-center justify-end gap-1"><ChevronUp aria-hidden="true" className="size-3.5" />{formatCount(post.likeCount, true)}</span>
          <span className="flex w-10 items-center justify-end gap-1"><MessageSquare aria-hidden="true" className="size-3.5" />{formatCount(post.commentCount, true)}</span>
          <span className="w-14 text-right">{formatCount(post.viewCount, true)}</span>
        </div>
      </Link>
    </li>
  );
}
