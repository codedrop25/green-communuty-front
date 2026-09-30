import Link from "next/link";
import { FileText } from "lucide-react";

export function EmptyState() {
  return (
    <div className="mt-4 grid min-h-72 place-items-center rounded-lg border border-border text-center">
      <div>
        <FileText aria-hidden="true" className="mx-auto size-6 text-fg-subtle" />
        <p className="mt-3 font-medium text-fg">아직 글이 없어요</p>
        <p className="mt-1 text-[13px] text-fg-muted">첫 글을 남겨보세요.</p>
        <Link href="/community/write" className="mt-4 inline-flex h-7 items-center rounded-md bg-primary px-2.5 text-[13px] font-medium text-white hover:bg-primary-hover">새 글 작성</Link>
      </div>
    </div>
  );
}
