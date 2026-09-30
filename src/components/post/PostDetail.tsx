import Link from "next/link";
import { ArrowLeft, MoreHorizontal } from "lucide-react";
import { Avatar } from "@/components/common/Avatar";
import { CategoryBadge } from "@/components/common/Badge";
import { comments as initialComments, boards } from "@/lib/mock-community";
import { formatCount, formatRelativeTime } from "@/lib/utils";
import type { PostDetailData } from "@/types";
import { CommentSection } from "./CommentSection";
import { PostActions } from "./PostActions";

export function PostDetail({ post }: { post: PostDetailData }) {
  const board = boards.find((item) => item.id === post.boardId) ?? boards[1];

  return (
    <article>
      <Link href={`/community/${post.boardId}`} className="inline-flex min-h-8 items-center gap-1 text-[13px] text-fg-muted transition-colors duration-150 hover:text-fg">
        <ArrowLeft aria-hidden="true" className="size-4" /> {board.name}
      </Link>
      <h1 className="mt-4 text-2xl font-semibold leading-8 tracking-tight text-fg">{post.title}</h1>
      <div className="mt-4 flex flex-wrap items-center gap-2 text-[13px] text-fg-muted">
        <Avatar nickname={post.author.nickname} size={24} isCurrentUser={post.author.id === "green-thumb"} />
        <strong className="font-medium text-fg">{post.author.nickname}</strong>
        <span aria-hidden="true">·</span><span>{formatRelativeTime(post.createdAt)}</span>
        <span aria-hidden="true">·</span><span>조회 {formatCount(post.viewCount)}</span>
        <CategoryBadge>{board.name}</CategoryBadge>
        <button type="button" aria-label="게시글 메뉴" className="ml-auto grid size-8 place-items-center rounded-md hover:bg-surface-muted">
          <MoreHorizontal aria-hidden="true" className="size-5" />
        </button>
      </div>

      <div className="mt-8 max-w-prose space-y-5 text-[15px] leading-7 text-fg-body">
        <p>{post.content[0]}</p>
        {post.hasImage && (
          <div role="img" aria-label="베란다 텃밭 예시 이미지 영역" className="aspect-video w-full rounded-lg border border-border bg-[repeating-linear-gradient(45deg,#f4f4f5_0_10px,#fafafa_10px_20px)]" />
        )}
        {post.content.slice(1).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        <div className="flex flex-wrap gap-1.5 pt-2">
          {post.tags.map((tag) => <span key={tag} className="rounded border border-border px-2 py-0.5 text-xs text-fg-secondary">#{tag}</span>)}
        </div>
      </div>

      <PostActions initialLikeCount={post.likeCount} />
      <CommentSection initialComments={initialComments} totalCount={post.commentCount} />
    </article>
  );
}
