"use client";

import { AdminProvider } from "./auth-guard";
import { AdminSidebar } from "./sidebar";

export function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <AdminProvider>
      <div className="flex min-h-[calc(100vh-4rem)]">
        <AdminSidebar />
        <div className="flex-1 overflow-auto p-6">{children}</div>
      </div>
    </AdminProvider>
  );
}
