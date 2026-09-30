import { PostEditor } from "@/components/post/PostEditor";
import { boards } from "@/lib/mock-community";
import type { BoardId } from "@/types";

export default async function WritePage({ searchParams }: { searchParams: Promise<{ board?: string }> }) {
  const { board } = await searchParams;
  const defaultBoard = boards.some((item) => item.id === board && item.id !== "all") ? board as BoardId : "free";

  return (
    <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <h1 className="text-xl font-semibold tracking-tight text-fg">새 글 작성</h1>
      <p className="mt-1 text-fg-muted">이웃과 나누고 싶은 이야기를 작성해주세요.</p>
      <PostEditor defaultBoard={defaultBoard} />
    </main>
  );
}
