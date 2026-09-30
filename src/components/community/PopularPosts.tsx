import Link from "next/link";
import { popularPosts, posts } from "@/lib/mock-community";

export function PopularPosts() {
  return (
    <section aria-labelledby="popular-posts-title">
      <h2 id="popular-posts-title" className="text-xs font-medium text-fg-muted">인기글</h2>
      <ol className="mt-2 space-y-2.5">
        {popularPosts.map((title, index) => {
          const post = posts.find((item) => title.startsWith(item.title.slice(0, 12))) ?? posts[index];
          return (
            <li key={title} className="flex gap-2.5 text-[13px]">
              <span className="w-3 shrink-0 tabular-nums text-fg-muted">{index + 1}</span>
              <Link href={`/community/${post.boardId}/${post.id}`} className="line-clamp-1 text-fg-body hover:text-fg hover:underline">
                {title}
              </Link>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
