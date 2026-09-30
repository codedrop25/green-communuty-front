import { PostListSkeleton } from "@/components/common/Skeleton";

export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="h-7 w-32 animate-pulse rounded bg-surface-muted" />
      <div className="mt-2 h-4 w-64 animate-pulse rounded bg-surface-muted" />
      <PostListSkeleton />
    </div>
  );
}
