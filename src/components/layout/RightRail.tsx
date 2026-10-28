"use client";

import { BoardRules } from "@/components/community/BoardRules";
import { communityApi, type Menu } from "@/lib/api/community";
import { useResource } from "@/hooks/useResource";
import { Button } from "@/components/common/Button";

function MenuTree({ items }: { items: Menu[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item.menu_id}>
          <span>{item.menu_name}</span>
          {item.children.length > 0 && (
            <div className="mt-2 border-l border-border pl-3">
              <MenuTree items={item.children} />
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}

export function RightRail() {
  const { data, loading, error, reload } = useResource(
    "menus",
    communityApi.menus,
  );
  return (
    <aside className="hidden w-[260px] shrink-0 space-y-8 xl:block">
      <section>
        <h2 className="text-xs font-medium text-fg-muted">커뮤니티</h2>
        <p className="mt-2 text-sm leading-6 text-fg-secondary">
          일상 속 경험과 질문을 나누는 공간입니다.
        </p>
      </section>
      <section>
        <h2 className="mb-3 text-xs font-medium text-fg-muted">
          커뮤니티 메뉴
        </h2>
        {loading ? (
          <p className="text-sm text-fg-muted">불러오는 중…</p>
        ) : error ? (
          <>
            <p role="alert" className="mb-2 text-xs text-danger">
              {error}
            </p>
            <Button size="sm" onClick={reload}>
              다시 시도
            </Button>
          </>
        ) : data?.length ? (
          <div className="text-sm text-fg-secondary">
            <MenuTree items={data} />
          </div>
        ) : (
          <p className="text-sm text-fg-muted">등록된 메뉴가 없습니다.</p>
        )}
      </section>
      <BoardRules />
    </aside>
  );
}
