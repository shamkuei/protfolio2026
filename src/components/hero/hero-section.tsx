"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/config/routing";
import { TerminalAnimation } from "./terminal-animation";

export function HeroSection() {
  const t = useTranslations("hero");
  const locale = useLocale();

  return (
    <section className="relative min-h-[calc(100vh-4rem)] bg-grid px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-12 lg:flex-row lg:gap-16">
        {/* Text content */}
        <div className="flex-1 space-y-6 text-center lg:text-start">
          <p className="font-mono text-sm tracking-wider text-neon">
            {t("greeting")}
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-text-primary sm:text-5xl lg:text-6xl">
            <span className="text-glow-green text-neon">
              {t("role").split("&")[0]}{locale === "fa" && <span style={{ color: "var(--neon-green)" }}> و</span>}
            </span>
            <br />
            <span style={locale === "fa" ? { color: "var(--neon-cyan)" } : undefined} className={locale === "en" ? "text-neon-cyan" : ""}>
              {locale === "en" && "& "}{t("role").split("&")[1]?.trim()}
            </span>
          </h1>
          <p className="max-w-lg text-lg text-text-secondary">
            {t("tagline")}
          </p>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
            <Link
              href="/projects"
              className="group inline-flex items-center gap-2 rounded border border-neon bg-neon/10 px-6 py-3 font-mono text-sm text-neon transition-all hover:bg-neon hover:text-carbon"
            >
              {t("cta.viewWork")}
              <span className="rtl-flip transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 rounded border border-carbon-border px-6 py-3 font-mono text-sm text-text-secondary transition-colors hover:border-neon-cyan hover:text-neon-cyan"
            >
              {t("cta.getInTouch")}
            </Link>
          </div>
        </div>

        {/* Terminal animation */}
        <div className="w-full max-w-xl flex-1">
          <TerminalAnimation />
        </div>
      </div>

      {/* Decorative corner elements */}
      <div className="pointer-events-none absolute start-4 top-16 h-16 w-16 border-s-2 border-t-2 border-neon/20" />
      <div className="pointer-events-none absolute bottom-4 end-4 h-16 w-16 border-b-2 border-e-2 border-neon-cyan/20" />
    </section>
  );
}
