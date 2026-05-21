"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/config/routing";
import { HiOutlinePlus, HiOutlinePencil } from "react-icons/hi";

const placeholderProjects = [
  { id: "1", titleEn: "Portfolio Website", status: "FEATURED", stars: 12 },
  { id: "2", titleEn: "API Gateway", status: "ACTIVE", stars: 34 },
  { id: "3", titleEn: "CI/CD Pipeline", status: "ACTIVE", stars: 56 },
  { id: "4", titleEn: "Monitoring Stack", status: "ARCHIVED", stars: 28 },
];

export function ProjectsAdminClient() {
  const t = useTranslations("admin");

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
            {placeholderProjects.map((project) => (
              <tr key={project.id} className="border-b border-carbon-border last:border-0">
                <td className="px-4 py-3 font-mono text-sm text-text-primary">
                  {project.titleEn}
                </td>
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
                  {project.stars}
                </td>
                <td className="px-4 py-3 text-right">
                  <Link
                    href={`/admin/projects/${project.id}/edit`}
                    className="inline-flex items-center gap-1 font-mono text-xs text-text-muted transition-colors hover:text-neon"
                  >
                    <HiOutlinePencil size={14} />
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
