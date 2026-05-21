"use client";

import { useTranslations } from "next-intl";
import { HiOutlineDocumentText, HiOutlineCollection, HiOutlineTag, HiOutlineEye } from "react-icons/hi";

const stats = [
  { label: "Posts", value: "3", icon: HiOutlineDocumentText, color: "text-neon" },
  { label: "Projects", value: "4", icon: HiOutlineCollection, color: "text-neon-cyan" },
  { label: "Categories", value: "5", icon: HiOutlineTag, color: "text-yellow-400" },
  { label: "Views", value: "1.2k", icon: HiOutlineEye, color: "text-purple-400" },
];

export function DashboardClient() {
  const t = useTranslations("admin");

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-text-primary">{t("title")}</h1>

      {/* Stats grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-lg border border-carbon-border bg-carbon-light p-4"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-text-muted">{stat.label}</span>
              <stat.icon size={20} className={stat.color} />
            </div>
            <p className="mt-2 text-2xl font-bold text-text-primary">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div className="rounded-lg border border-carbon-border bg-carbon-light p-6">
        <h2 className="mb-4 font-mono text-sm uppercase tracking-wider text-neon-cyan">
          [Quick Actions]
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
