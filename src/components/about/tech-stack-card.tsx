"use client";

import { useTranslations } from "next-intl";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiPostgresql,
  SiMongodb,
  SiRedis,
  SiDocker,
  SiKubernetes,
  SiGit,
  SiLinux,
  SiNginx,
  SiGithubactions,
  SiTerraform,
} from "react-icons/si";
import { FaAws } from "react-icons/fa6";
import { cn } from "@/lib/utils";

const techCategories = [
  {
    key: "frontend",
    items: [
      { name: "React", icon: SiReact, color: "#61DAFB" },
      { name: "Next.js", icon: SiNextdotjs, color: "#ffffff" },
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
      { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
      { name: "TailwindCSS", icon: SiTailwindcss, color: "#06B6D4" },
    ],
  },
  {
    key: "backend",
    items: [
      { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
      { name: "Express", icon: SiExpress, color: "#ffffff" },
      { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
      { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
      { name: "Redis", icon: SiRedis, color: "#DC382D" },
    ],
  },
  {
    key: "devops",
    items: [
      { name: "Docker", icon: SiDocker, color: "#2496ED" },
      { name: "Kubernetes", icon: SiKubernetes, color: "#326CE5" },
      { name: "AWS", icon: FaAws, color: "#FF9900" },
      { name: "Nginx", icon: SiNginx, color: "#009639" },
      { name: "GitHub Actions", icon: SiGithubactions, color: "#ffffff" },
      { name: "Terraform", icon: SiTerraform, color: "#7B42BC" },
      { name: "Git", icon: SiGit, color: "#F05032" },
      { name: "Linux", icon: SiLinux, color: "#FCC624" },
    ],
  },
] as const;

export function TechStackCard() {
  const t = useTranslations("about");

  return (
    <div className="space-y-8">
      <h3 className="font-mono text-lg text-neon">
        &gt; {t("techStack")}
      </h3>
      <div className="grid gap-6 md:grid-cols-3">
        {techCategories.map((category) => (
          <div
            key={category.key}
            className="rounded-lg border border-carbon-border bg-carbon-light p-4"
          >
            <h4 className="mb-4 font-mono text-sm uppercase tracking-wider text-neon-cyan">
              [{t(category.key)}]
            </h4>
            <div className="flex flex-wrap gap-3">
              {category.items.map((item) => (
                <div
                  key={item.name}
                  className={cn(
                    "flex items-center gap-2 rounded-md border border-carbon-border px-3 py-1.5",
                    "transition-all hover:border-opacity-60 hover:shadow-sm"
                  )}
                  style={{
                    ["--hover-color" as string]: item.color,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = item.color;
                    e.currentTarget.style.boxShadow = `0 0 12px ${item.color}33`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "";
                    e.currentTarget.style.boxShadow = "";
                  }}
                >
                  <item.icon size={16} color={item.color} />
                  <span className="font-mono text-xs text-text-secondary">
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
