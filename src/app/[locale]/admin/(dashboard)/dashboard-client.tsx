"use client";

import { useTranslations } from "next-intl";
import { HiOutlineDocumentText, HiOutlineCollection, HiOutlineTag, HiOutlineEye } from "react-icons/hi";
import { useEffect, useState } from "react";

interface Stats {
  posts: number;
  projects: number;
  categories: number;
  views: number;
}

export function DashboardClient() {
  const t = useTranslations("admin");
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((r) => r.json())
      .then((data) => setStats(data))
      .catch(() => setStats({ posts: 0, projects: 0, categories: 0, views: 0 }))
      .finally(() => setLoading(false));
  }, []);

  const cards = [
    { label: t("posts"), value: stats?.posts ?? 0, icon: HiOutlineDocumentText, color: "text-neon" },
    { label: t("projects"), value: stats?.projects ?? 0, icon: HiOutlineCollection, color: "text-neon-cyan" },
    { label: t("categories"), value: stats?.categories ?? 0, icon: HiOutlineTag, color: "text-yellow-400" },
    { label: t("views"), value: stats?.views ?? 0, icon: HiOutlineEye, color: "text-purple-400" },
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-text-primary">{t("title")}</h1>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="animate-pulse rounded-lg border border-carbon-border bg-carbon-light p-4">
                <div className="h-3 w-1/3 rounded bg-carbon-lighter" />
                <div className="mt-3 h-7 w-1/2 rounded bg-carbon-lighter" />
              </div>
            ))
          : cards.map((stat) => (
              <div key={stat.label} className="rounded-lg border border-carbon-border bg-carbon-light p-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-text-muted">{stat.label}</span>
                  <stat.icon size={20} className={stat.color} />
                </div>
                <p className="mt-2 text-2xl font-bold text-text-primary">{stat.value}</p>
              </div>
            ))}
      </div>

      <div className="rounded-lg border border-carbon-border bg-carbon-light p-6">
        <h2 className="mb-4 font-mono text-sm uppercase tracking-wider text-neon-cyan">
          [{t("quickActions")}]
        </h2>
        <div className="flex flex-wrap gap-3">
          <a
            href="/admin/posts/new"
            className="rounded border border-neon bg-neon/10 px-4 py-2 font-mono text-sm text-neon transition-colors hover:bg-neon hover:text-carbon"
          >
            + {t("newPost")}
          </a>
          <a
            href="/admin/projects/new"
            className="rounded border border-neon-cyan bg-neon-cyan/10 px-4 py-2 font-mono text-sm text-neon-cyan transition-colors hover:bg-neon-cyan hover:text-carbon"
          >
            + {t("newProject")}
          </a>
        </div>
      </div>
    </div>
  );
}
