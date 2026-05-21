"use client";

import { SiGithub } from "react-icons/si";
import { HiStar } from "react-icons/hi";
import { VscRepoForked } from "react-icons/vsc";

interface GitHubStatsProps {
  stars: number;
  forks: number;
  language: string | null;
  repoUrl: string;
}

export function GitHubStats({ stars, forks, language, repoUrl }: GitHubStatsProps) {
  return (
    <a
      href={repoUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-4 rounded-lg border border-carbon-border bg-carbon-light px-4 py-3 transition-colors hover:border-neon/50"
    >
      <SiGithub size={20} className="text-text-secondary" />
      <div className="flex items-center gap-3 font-mono text-sm">
        {stars > 0 && (
          <span className="flex items-center gap-1 text-yellow-400">
            <HiStar size={14} />
            {stars}
          </span>
        )}
        {forks > 0 && (
          <span className="flex items-center gap-1 text-text-secondary">
            <VscRepoForked size={14} />
            {forks}
          </span>
        )}
        {language && (
          <span className="flex items-center gap-1 text-text-secondary">
            <span className="h-2 w-2 rounded-full bg-neon" />
            {language}
          </span>
        )}
      </div>
    </a>
  );
}
