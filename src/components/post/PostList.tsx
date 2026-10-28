import { NoticeRow } from "./NoticeRow";
import { PostListItem } from "./PostListItem";
import type { Notice, PostSummary } from "@/types";

export function PostList({
  notices,
  posts,
}: {
  notices: Notice[];
  posts: PostSummary[];
}) {
  return (
    <div className="mt-4 overflow-hidden rounded-lg border border-border bg-surface">
      {notices.map((notice) => (
        <NoticeRow key={notice.id} notice={notice} />
      ))}
      <ul className="divide-y divide-border-subtle">
        {posts.map((post) => (
          <PostListItem key={post.id} post={post} />
        ))}
      </ul>
    </div>
  );
}
