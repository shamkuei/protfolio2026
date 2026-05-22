"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/config/routing";
import { SiGithub } from "react-icons/si";
import { HiExternalLink, HiStar } from "react-icons/hi";

interface ProjectCardProps {
  slug: string;
  title: string;
  description: string;
  techStack: string[];
  stars?: number;
  repoUrl?: string | null;
  liveUrl?: string | null;
}

export function ProjectCard({
  slug,
  title,
  description,
  techStack,
  stars,
  repoUrl,
  liveUrl,
}: ProjectCardProps) {
  const t = useTranslations("projects");

  return (
    <div className="group relative rounded-lg border border-carbon-border bg-carbon-light p-6 transition-all hover:border-neon/30 hover:shadow-[0_0_30px_rgba(0,255,136,0.05)]">
      {/* Top links */}
      <div className="mb-4 flex items-center justify-between">
        <span className="font-mono text-xs text-text-muted" dir="ltr">
          ~/projects/{slug}
        </span>
        <div className="flex gap-2">
          {repoUrl && (
            <a
              href={repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-muted transition-colors hover:text-neon"
            >
              <SiGithub size={18} />
            </a>
          )}
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-muted transition-colors hover:text-neon-cyan"
            >
              <HiExternalLink size={18} />
            </a>
          )}
        </div>
      </div>

      {/* Title */}
      <h3 className="mb-2 text-lg font-semibold text-text-primary transition-colors group-hover:text-neon">
        {title}
      </h3>

      {/* Description */}
      <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-text-secondary">
        {description}
      </p>

      {/* Tech stack */}
      <div className="mb-4 flex flex-wrap gap-2">
        {techStack.map((tech) => (
          <span
            key={tech}
            className="rounded border border-carbon-border px-2 py-0.5 font-mono text-xs text-text-muted"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-carbon-border pt-3">
        {stars !== undefined && stars > 0 && (
          <span className="flex items-center gap-1 font-mono text-xs text-text-muted">
            <HiStar size={12} className="text-yellow-400" />
            {stars}
          </span>
        )}
        <Link
          href={`/projects/${slug}`}
          className="font-mono text-xs text-neon transition-colors hover:text-neon-cyan"
        >
          {t("viewDetails")}
        </Link>
      </div>
    </div>
  );
}
