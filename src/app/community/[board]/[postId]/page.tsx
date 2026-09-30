import { notFound } from "next/navigation";
import { RightRail } from "@/components/layout/RightRail";
import { PostDetail } from "@/components/post/PostDetail";
import { boards, featuredPost, posts } from "@/lib/mock-community";
import type { PostDetailData } from "@/types";

export default async function PostPage({ params }: { params: Promise<{ board: string; postId: string }> }) {
  const { board: boardId, postId } = await params;
  const board = boards.find((item) => item.id === boardId);
  const summary = posts.find((item) => item.id === Number(postId) && item.boardId === boardId);
  if (!board || !summary) notFound();

  const post: PostDetailData = summary.id === featuredPost.id
    ? featuredPost
    : { ...summary, content: [summary.excerpt, "여러분의 경험과 생각도 댓글로 함께 나눠주세요."], tags: [board.name] };

  return (
    <div className="mx-auto grid max-w-6xl gap-10 px-4 py-8 sm:px-6 xl:grid-cols-[minmax(0,1fr)_260px]">
      <main className="min-w-0"><PostDetail post={post} /></main>
      <RightRail board={board} />
    </div>
  );
}
