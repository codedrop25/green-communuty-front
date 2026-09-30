import { notFound } from "next/navigation";
import { SlidersHorizontal } from "lucide-react";
import { EmptyState } from "@/components/common/EmptyState";
import { Pagination } from "@/components/common/Pagination";
import { SegmentedTabs } from "@/components/common/SegmentedTabs";
import { RightRail } from "@/components/layout/RightRail";
import { PostList } from "@/components/post/PostList";
import { boards, notices, posts } from "@/lib/mock-community";

const sortOptions = [
  { label: "최신", value: "latest" },
  { label: "인기", value: "popular" },
  { label: "주간 TOP", value: "weekly" },
  { label: "답변 대기", value: "waiting" },
];

export function generateStaticParams() {
  return boards.map((board) => ({ board: board.id }));
}

export default async function BoardPage({ params, searchParams }: { params: Promise<{ board: string }>; searchParams: Promise<{ sort?: string }> }) {
  const { board: boardId } = await params;
  const { sort = "latest" } = await searchParams;
  const board = boards.find((item) => item.id === boardId);
  if (!board) notFound();

  const boardPosts = board.id === "all" || board.id === "free" ? posts : posts.filter((post) => post.boardId === board.id);
  const tabs = sortOptions.map((option) => ({ ...option, href: `/community/${board.id}?sort=${option.value}` }));

  return (
    <div className="mx-auto grid max-w-6xl gap-10 px-4 py-8 sm:px-6 xl:grid-cols-[minmax(0,1fr)_260px]">
      <main className="min-w-0">
        <h1 className="text-xl font-semibold tracking-tight text-fg">{board.name}</h1>
        <p className="mt-1 text-fg-muted">{board.description}</p>
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <SegmentedTabs tabs={tabs} selected={sortOptions.some((item) => item.value === sort) ? sort : "latest"} />
          <button type="button" className="inline-flex h-8 items-center gap-1.5 rounded-md px-2 text-[13px] text-fg-muted transition-colors duration-150 hover:bg-surface-muted">
            <SlidersHorizontal aria-hidden="true" className="size-4" strokeWidth={1.75} /> 필터
          </button>
        </div>
        {boardPosts.length > 0 ? (
          <>
            <PostList notices={board.id === "free" || board.id === "all" ? notices : []} posts={boardPosts} />
            <Pagination currentCount={boardPosts.length} totalCount={board.count} />
          </>
        ) : <EmptyState />}
      </main>
      <RightRail board={board} />
    </div>
  );
}
