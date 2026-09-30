import type { Board } from "@/types";
import { formatCount } from "@/lib/utils";

export function BoardInfo({ board }: { board: Board }) {
  return (
    <section aria-labelledby="board-info-title">
      <h2 id="board-info-title" className="text-xs font-medium text-fg-muted">게시판 정보</h2>
      <p className="mt-2 leading-6 text-fg-secondary">{board.description}</p>
      <dl className="mt-3 grid grid-cols-2 gap-2 text-[13px]">
        <div className="rounded-md border border-border p-2.5">
          <dt className="text-fg-muted">멤버</dt>
          <dd className="font-semibold tabular-nums text-fg">{formatCount(12480)}</dd>
        </div>
        <div className="rounded-md border border-border p-2.5">
          <dt className="text-fg-muted">접속 중</dt>
          <dd className="flex items-center gap-1.5 font-semibold tabular-nums text-brand">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-brand-strong" />312
          </dd>
        </div>
      </dl>
    </section>
  );
}
