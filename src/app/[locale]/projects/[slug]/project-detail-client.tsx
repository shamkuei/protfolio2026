"use client";

import { ScreenshotCarousel } from "@/components/projects/screenshot-carousel";
import { GitHubStats } from "@/components/projects/github-stats";
import { HiExternalLink } from "react-icons/hi";
import { SiGithub } from "react-icons/si";

interface ProjectDetailClientProps {
  project: {
    titleEn: string;
    titleFa: string;
    descriptionEn: string;
    descriptionFa: string;
    repoUrl: string | null;
    liveUrl: string | null;
    techStack: string[];
    screenshots: { url: string; caption: string }[];
    githubData?: { stars: number; forks: number; language: string | null };
    caseStudies: {
      titleEn: string;
      titleFa: string;
      contentEn: string;
      contentFa: string;
    }[];
  };
  locale: string;
}

export function ProjectDetailClient({ project, locale }: ProjectDetailClientProps) {
  const title = locale === "fa" ? project.titleFa : project.titleEn;
  const description = locale === "fa" ? project.descriptionFa : project.descriptionEn;

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-text-primary sm:text-4xl">
          {title}
        </h1>
        <p className="text-lg leading-relaxed text-text-secondary">
          {description}
        </p>
        <div className="flex flex-wrap gap-3">
          {project.repoUrl && project.githubData && (
            <GitHubStats
              repoUrl={project.repoUrl}
              stars={project.githubData.stars}
              forks={project.githubData.forks}
              language={project.githubData.language}
            />
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-carbon-border bg-carbon-light px-4 py-3 font-mono text-sm text-text-secondary transition-colors hover:border-neon-cyan hover:text-neon-cyan"
            >
              <HiExternalLink size={16} />
              Live Demo
            </a>
          )}
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-carbon-border bg-carbon-light px-4 py-3 font-mono text-sm text-text-secondary transition-colors hover:border-neon hover:text-neon"
            >
              <SiGithub size={16} />
              Source Code
            </a>
          )}
        </div>
      </div>

      {/* Tech Stack */}
      <div>
        <h3 className="mb-4 font-mono text-sm uppercase tracking-wider text-neon-cyan">
          [Tech Stack]
        </h3>
        <div className="flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="rounded border border-carbon-border bg-carbon-light px-3 py-1.5 font-mono text-xs text-text-secondary"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Screenshots */}
      <div>
        <h3 className="mb-4 font-mono text-sm uppercase tracking-wider text-neon-cyan">
          [Screenshots]
        </h3>
        <ScreenshotCarousel screenshots={project.screenshots} />
      </div>

      {/* Case Studies */}
      {project.caseStudies.length > 0 && (
        <div>
          <h3 className="mb-4 font-mono text-sm uppercase tracking-wider text-neon-cyan">
            [Case Study]
          </h3>
          <div className="space-y-6">
            {project.caseStudies.map((study, i) => (
              <div
                key={i}
                className="rounded-lg border border-carbon-border bg-carbon-light p-6"
              >
                <h4 className="mb-3 text-lg font-semibold text-text-primary">
                  {locale === "fa" ? study.titleFa : study.titleEn}
                </h4>
                <p className="leading-relaxed text-text-secondary">
                  {locale === "fa" ? study.contentFa : study.contentEn}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
