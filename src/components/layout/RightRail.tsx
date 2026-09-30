import type { Board } from "@/types";
import { BoardInfo } from "@/components/community/BoardInfo";
import { BoardRules } from "@/components/community/BoardRules";
import { PopularPosts } from "@/components/community/PopularPosts";
import { TagCloud } from "@/components/community/TagCloud";

export function RightRail({ board }: { board: Board }) {
  return (
    <aside className="hidden w-[260px] shrink-0 space-y-8 xl:block">
      <BoardInfo board={board} />
      <PopularPosts />
      <TagCloud />
      <BoardRules />
    </aside>
  );
}
