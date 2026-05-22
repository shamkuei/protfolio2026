"use client";

import { useTranslations, useLocale } from "next-intl";
import { TechStackCard } from "./tech-stack-card";
import { Link } from "@/config/routing";
import {
  HiOutlineDownload,
  HiOutlineMail,
  HiOutlineLocationMarker,
} from "react-icons/hi";
import { SiGithub, SiX } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa6";

const socialLinks = [
  { icon: SiGithub, href: "https://github.com", label: "GitHub" },
  { icon: FaLinkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: SiX, href: "https://x.com", label: "X" },
  { icon: HiOutlineMail, href: "mailto:hello@example.com", label: "Email" },
];

export function AboutSection() {
  const t = useTranslations("about");
  const locale = useLocale();

  return (
    <section
      id="about"
      className="border-t border-carbon-border px-4 py-20 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl space-y-12">
        {/* Section header */}
        <div className="flex items-center gap-4">
          <span className="font-mono text-sm text-neon">01.</span>
          <h2 className="text-3xl font-bold text-text-primary">{t("title")}</h2>
          <div className="h-px flex-1 bg-carbon-border" />
        </div>

        <div className="grid gap-12 lg:grid-cols-[2fr_1fr]">
          {/* Bio and content */}
          <div className="space-y-8">
            {/* Bio */}
            <div className="rounded-lg border border-carbon-border bg-carbon-light p-6">
              <div className="mb-3 flex items-center gap-2 border-b border-carbon-border pb-3" dir="ltr">
                <span className="font-mono text-xs text-neon">
                  ~/about
                </span>
                <span className="font-mono text-xs text-text-muted">—</span>
                <span className="font-mono text-xs text-text-muted">
                  bio.md
                </span>
              </div>
              <p className="leading-relaxed text-text-secondary">
                {t("bio")}
              </p>
            </div>

            {/* Resume download */}
            <a
              href="#"
              className="inline-flex items-center gap-2 rounded border border-carbon-border px-4 py-2 font-mono text-sm text-text-secondary transition-colors hover:border-neon-cyan hover:text-neon-cyan"
            >
              <HiOutlineDownload size={16} />
              {t("downloadResume")}
            </a>

            {/* Tech Stack */}
            <TechStackCard />
          </div>

          {/* Avatar and social */}
          <div className="flex flex-col items-center gap-6">
            {/* Avatar placeholder */}
            <div className="relative">
              <div className="h-48 w-48 rounded-lg border-2 border-neon bg-carbon-lighter bg-grid" />
              <div className="absolute -bottom-2 -right-2 h-48 w-48 rounded-lg border border-neon-cyan/30" />
            </div>

            {/* Social links */}
            <div className="flex gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-md border border-carbon-border p-2 text-text-muted transition-colors hover:border-neon hover:text-neon"
                  aria-label={link.label}
                >
                  <link.icon size={20} />
                </a>
              ))}
            </div>

            <div className="flex items-center gap-2 text-sm text-text-muted">
              <HiOutlineLocationMarker size={16} />
              <span>Remote / Worldwide</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
