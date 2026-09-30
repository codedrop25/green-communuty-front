import Link from "next/link";
import { cn } from "@/lib/utils";

type Tab = {
  label: string;
  value: string;
  href: string;
};

export function SegmentedTabs({ tabs, selected }: { tabs: Tab[]; selected: string }) {
  return (
    <div role="tablist" aria-label="게시글 정렬" className="inline-flex rounded-lg bg-surface-muted p-0.5">
      {tabs.map((tab) => {
        const isSelected = selected === tab.value;
        return (
          <Link
            key={tab.value}
            href={tab.href}
            role="tab"
            aria-selected={isSelected}
            className={cn(
              "rounded-md px-3 py-1 text-[13px] transition-colors duration-150",
              isSelected ? "bg-surface font-medium text-fg shadow-sm" : "text-fg-muted hover:text-fg",
            )}
          >
            {tab.label}
          </Link>
        );
      })}
    </div>
  );
}
