import Link from "next/link";
import { NoticeBadge } from "@/components/common/Badge";
import type { Notice } from "@/types";

export function NoticeRow({ notice }: { notice: Notice }) {
  return (
    <Link href={`/community/free?notice=${notice.id}`} className="flex items-center gap-2 border-b border-border bg-surface-subtle px-4 py-2.5 text-[13px] transition-colors duration-150 hover:bg-surface-muted">
      <NoticeBadge />
      <span className="truncate font-medium text-fg">{notice.title}</span>
    </Link>
  );
}
