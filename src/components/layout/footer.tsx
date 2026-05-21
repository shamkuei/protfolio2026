"use client";

import { useTranslations } from "next-intl";

export function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="border-t border-carbon-border bg-carbon-light">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-6 sm:px-6 lg:px-8">
        <p className="font-mono text-xs text-text-muted">
          {t("copyright", { year: new Date().getFullYear() })}
        </p>
        <p className="font-mono text-xs text-text-muted">
          {t("builtWith")}
        </p>
      </div>
    </footer>
  );
}
