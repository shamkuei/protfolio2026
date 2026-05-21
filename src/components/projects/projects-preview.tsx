"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/config/routing";
import { ProjectCard } from "./project-card";

const placeholderProjects = [
  {
    slug: "portfolio-website",
    titleEn: "Portfolio Website",
    titleFa: "وبسایت پورتفولیو",
    descriptionEn: "A modern bilingual portfolio and weblog built with Next.js, Prisma, and Docker.",
    descriptionFa: "یک پورتفولیو و وبلاگ دوزبانه مدرن با Next.js، Prisma و Docker.",
    techStack: ["Next.js", "TypeScript", "TailwindCSS", "Prisma", "Docker"],
    stars: 12,
    repoUrl: "https://github.com",
    liveUrl: "#",
  },
  {
    slug: "api-gateway",
    titleEn: "API Gateway Service",
    titleFa: "سرویس API گیت‌وی",
    descriptionEn: "A high-performance API gateway with rate limiting, caching, and authentication.",
    descriptionFa: "یک API گیت‌وی با کارایی بالا با محدودیت نرخ، کش و احراز هویت.",
    techStack: ["Node.js", "Redis", "Docker", "Kubernetes", "Nginx"],
    stars: 34,
    repoUrl: "https://github.com",
    liveUrl: null,
  },
  {
    slug: "ci-cd-pipeline",
    titleEn: "CI/CD Pipeline Framework",
    titleFa: "فریمورک CI/CD پایپلاین",
    descriptionEn: "Automated deployment pipeline with GitHub Actions, Terraform, and AWS.",
    descriptionFa: "پایپلاین استقرار خودکار با GitHub Actions، Terraform و AWS.",
    techStack: ["GitHub Actions", "Terraform", "AWS", "Docker", "Bash"],
    stars: 56,
    repoUrl: "https://github.com",
    liveUrl: null,
  },
];

export function ProjectsPreview() {
  const t = useTranslations("projects");
  const locale = useLocale();

  return (
    <section className="border-t border-carbon-border px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-12">
        {/* Section header */}
        <div className="flex items-center gap-4">
          <span className="font-mono text-sm text-neon">03.</span>
          <h2 className="text-3xl font-bold text-text-primary">{t("title")}</h2>
          <div className="h-px flex-1 bg-carbon-border" />
        </div>

        {/* Project grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {placeholderProjects.map((project) => (
            <ProjectCard
              key={project.slug}
              slug={project.slug}
              title={locale === "fa" ? project.titleFa : project.titleEn}
              description={locale === "fa" ? project.descriptionFa : project.descriptionEn}
              techStack={project.techStack}
              stars={project.stars}
              repoUrl={project.repoUrl}
              liveUrl={project.liveUrl}
            />
          ))}
        </div>

        {/* View all link */}
        <div className="text-center">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 rounded border border-carbon-border px-6 py-3 font-mono text-sm text-text-secondary transition-colors hover:border-neon hover:text-neon"
          >
            {t("viewAll")}
          </Link>
        </div>
      </div>
    </section>
  );
}
