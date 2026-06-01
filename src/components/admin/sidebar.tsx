"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/config/routing";
import { cn } from "@/lib/utils";
import {
  HiOutlineHome,
  HiOutlineDocumentText,
  HiOutlineCollection,
  HiOutlineCog,
  HiOutlineLogout,
} from "react-icons/hi";
import { signOut } from "next-auth/react";

const sidebarLinks = [
  { href: "/admin", key: "dashboard", icon: HiOutlineHome },
  { href: "/admin/posts", key: "posts", icon: HiOutlineDocumentText },
  { href: "/admin/projects", key: "projects", icon: HiOutlineCollection },
  { href: "/admin/categories", key: "categories", icon: HiOutlineCollection },
  { href: "/admin/settings", key: "settings", icon: HiOutlineCog },
];

export function AdminSidebar() {
  const t = useTranslations("admin");
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === href;
    return pathname.startsWith(href);
  };

  return (
    <aside className="flex h-full w-60 flex-col border-r border-carbon-border bg-carbon-light">
      <div className="flex h-16 items-center gap-2 border-b border-carbon-border px-4">
        <span className="font-mono text-lg text-neon">&gt;_</span>
        <span className="font-mono text-sm text-text-secondary">admin</span>
      </div>

      <nav className="flex-1 space-y-1 p-3">
        {sidebarLinks.map((link) => (
          <Link
            key={link.key}
            href={link.href}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 font-mono text-sm transition-colors",
              isActive(link.href)
                ? "bg-neon/10 text-neon"
                : "text-text-secondary hover:bg-carbon-lighter hover:text-text-primary"
            )}
          >
            <link.icon size={18} />
            {link.key === "dashboard" ? t("title") : t(link.key)}
          </Link>
        ))}
      </nav>

      <div className="border-t border-carbon-border p-3">
        <button
          onClick={() => signOut()}
          className="flex w-full items-center gap-3 rounded-md px-3 py-2 font-mono text-sm text-text-muted transition-colors hover:text-red-400"
        >
          <HiOutlineLogout size={18} />
          {t("logout")}
        </button>
      </div>
    </aside>
  );
}
