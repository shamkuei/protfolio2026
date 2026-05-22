"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/config/routing";
import { LanguageSwitcher } from "./language-switcher";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { HiMenu, HiX } from "react-icons/hi";

const navLinks = [
  { href: "/", key: "home" },
  { href: "/about", key: "about" },
  { href: "/blog", key: "blog" },
  { href: "/projects", key: "projects" },
] as const;

export function Header() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-carbon-border bg-carbon/80 backdrop-blur-md" dir="ltr">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-mono text-neon">
          <span className="text-lg font-bold">&gt;_</span>
          <span className="text-sm tracking-wider text-text-primary">
            shamkuie.ir
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.key}
              href={link.href}
              className={cn(
                "rounded px-3 py-2 font-mono text-sm transition-colors",
                pathname === link.href
                  ? "text-neon bg-neon-glow"
                  : "text-text-secondary hover:text-text-primary hover:bg-carbon-light"
              )}
            >
              {t(link.key)}
            </Link>
          ))}
          <div className="ms-4 border-s border-carbon-border ps-4">
            <LanguageSwitcher />
          </div>
        </nav>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="text-text-secondary md:hidden"
        >
          {mobileOpen ? <HiX size={24} /> : <HiMenu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <nav className="border-t border-carbon-border bg-carbon-light px-4 py-4 md:hidden">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "rounded px-3 py-2 font-mono text-sm transition-colors",
                  pathname === link.href
                    ? "text-neon bg-neon-glow"
                    : "text-text-secondary hover:text-text-primary"
                )}
              >
                {t(link.key)}
              </Link>
            ))}
            <div className="mt-2 border-t border-carbon-border pt-2">
              <LanguageSwitcher />
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
