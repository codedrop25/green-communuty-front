import Link from "next/link";
import { formatCount, formatRelativeTime } from "@/lib/utils";
import type { PostSummary } from "@/types";

export function PostListItem({ post }: { post: PostSummary }) {
  return (
    <li>
      <Link
        href={`/community/all/${post.id}`}
        className="group flex items-center gap-4 px-4 py-4 transition-colors duration-150 hover:bg-surface-subtle"
      >
        <div className="min-w-0 flex-1">
          <h2 className="truncate font-medium text-fg">{post.title}</h2>
          <p className="mt-1 text-xs text-fg-muted">
            {post.author.nickname} · {formatRelativeTime(post.createdAt)}
          </p>
        </div>
        {post.viewCount !== undefined && (
          <span className="shrink-0 text-xs tabular-nums text-fg-muted">
            조회 {formatCount(post.viewCount, true)}
          </span>
        )}
      </Link>
    </li>
  );
}
