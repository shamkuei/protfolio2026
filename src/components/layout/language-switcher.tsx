"use client";

import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname } from "@/config/routing";

export function LanguageSwitcher() {
  const locale = useLocale();
  const t = useTranslations("nav");
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = () => {
    const nextLocale = locale === "en" ? "fa" : "en";
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <button
      onClick={switchLocale}
      className="rounded border border-carbon-border px-3 py-1.5 font-mono text-sm text-text-secondary transition-colors hover:border-neon hover:text-neon"
      aria-label="Switch language"
    >
      {t("switchLang")}
    </button>
  );
}
