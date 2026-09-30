"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { MobileNavDrawer } from "./MobileNavDrawer";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-surface">
      <Sidebar pathname={pathname} />
      <MobileNavDrawer open={isMenuOpen} pathname={pathname} onClose={() => setIsMenuOpen(false)} />
      <div className="min-w-0 flex-1">
        <Topbar pathname={pathname} onOpenMenu={() => setIsMenuOpen(true)} />
        {children}
      </div>
    </div>
  );
}
