"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import { Sidebar } from "./Sidebar";

export function MobileNavDrawer({ open, pathname, onClose }: { open: boolean; pathname: string; onClose: () => void }) {
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <button type="button" aria-label="메뉴 닫기" onClick={onClose} className="absolute inset-0 bg-black/30" />
      <div role="dialog" aria-modal="true" aria-label="모바일 메뉴" className="relative h-full w-[min(300px,85vw)] bg-surface shadow-lg">
        <button type="button" aria-label="메뉴 닫기" onClick={onClose} className="absolute right-3 top-3 z-10 grid size-8 place-items-center rounded-md text-fg-muted hover:bg-surface-muted">
          <X aria-hidden="true" className="size-5" />
        </button>
        <Sidebar pathname={pathname} mobile onNavigate={onClose} />
      </div>
    </div>
  );
}
