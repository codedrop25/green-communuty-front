export function PostListSkeleton() {
  return (
    <div className="mt-4 overflow-hidden rounded-lg border border-border">
      {Array.from({ length: 5 }, (_, index) => (
        <div key={index} className="border-b border-border-subtle px-4 py-3 last:border-b-0">
          <div className="h-4 w-3/5 animate-pulse rounded bg-surface-muted" />
          <div className="mt-2 h-3 w-1/3 animate-pulse rounded bg-surface-muted" />
        </div>
      ))}
    </div>
  );
}
