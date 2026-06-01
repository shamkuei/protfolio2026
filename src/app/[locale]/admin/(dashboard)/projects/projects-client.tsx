"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/config/routing";
import { HiOutlinePlus, HiOutlinePencil, HiOutlineTrash } from "react-icons/hi";
import { useEffect, useState } from "react";

interface Project {
  id: string;
  titleEn: string;
  status: string;
  githubStars: number | null;
}

export function ProjectsAdminClient() {
  const t = useTranslations("admin");
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/projects")
      .then((r) => r.json())
      .then((data) => setProjects(data))
      .catch(() => setProjects([]))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm(t("deleteConfirm"))) return;
    const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
    if (res.ok) {
      setProjects((prev) => prev.filter((p) => p.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-text-primary">{t("projects")}</h1>
        <Link
          href="/admin/projects/new"
          className="flex items-center gap-2 rounded border border-neon-cyan bg-neon-cyan/10 px-4 py-2 font-mono text-sm text-neon-cyan transition-colors hover:bg-neon-cyan hover:text-carbon"
        >
          <HiOutlinePlus size={16} />
          {t("newProject")}
        </Link>
      </div>

      {loading ? (
        <div className="space-y-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="animate-pulse rounded border border-carbon-border bg-carbon-light p-4">
              <div className="h-4 w-1/3 rounded bg-carbon-lighter" />
            </div>
          ))}
        </div>
      ) : projects.length === 0 ? (
        <div className="rounded-lg border border-carbon-border bg-carbon-light p-8 text-center">
          <p className="font-mono text-sm text-text-muted">{t("noItems")}</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-lg border border-carbon-border">
          <table className="w-full">
            <thead>
              <tr className="border-b border-carbon-border bg-carbon-light">
                <th className="px-4 py-3 text-left font-mono text-xs text-text-muted">Project</th>
                <th className="px-4 py-3 text-left font-mono text-xs text-text-muted">Status</th>
                <th className="px-4 py-3 text-left font-mono text-xs text-text-muted">Stars</th>
                <th className="px-4 py-3 text-right font-mono text-xs text-text-muted">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.id} className="border-b border-carbon-border last:border-0">
                  <td className="px-4 py-3 font-mono text-sm text-text-primary">{project.titleEn}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded px-2 py-0.5 font-mono text-xs ${
                        project.status === "FEATURED"
                          ? "bg-neon/10 text-neon"
                          : project.status === "ACTIVE"
                          ? "bg-neon-cyan/10 text-neon-cyan"
                          : "bg-text-muted/10 text-text-muted"
                      }`}
                    >
                      {project.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-mono text-sm text-text-muted">
                    {project.githubStars ?? "—"}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/projects/${project.id}/edit`}
                        className="inline-flex items-center gap-1 font-mono text-xs text-text-muted transition-colors hover:text-neon"
                      >
                        <HiOutlinePencil size={14} />
                        {t("editProject")}
                      </Link>
                      <button
                        onClick={() => handleDelete(project.id)}
                        className="inline-flex items-center gap-1 font-mono text-xs text-text-muted transition-colors hover:text-red-400"
                      >
                        <HiOutlineTrash size={14} />
                        {t("delete")}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
