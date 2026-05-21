"use client";

import { useTranslations } from "next-intl";
import { ProjectCard } from "@/components/projects/project-card";

const projects = [
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
  {
    slug: "monitoring-stack",
    titleEn: "Monitoring & Observability Stack",
    titleFa: "استک مانیتورینگ و قابلیت مشاهده",
    descriptionEn: "Full observability stack with Prometheus, Grafana, and custom alerting.",
    descriptionFa: "استک قابلیت مشاهده کامل با Prometheus، Grafana و هشدار سفارشی.",
    techStack: ["Prometheus", "Grafana", "Docker", "Go", "AlertManager"],
    stars: 28,
    repoUrl: "https://github.com",
    liveUrl: null,
  },
];

export function ProjectsListClient({ locale }: { locale: string }) {
  const t = useTranslations("projects");

  return (
    <div className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-12">
        <div className="flex items-center gap-4">
          <span className="font-mono text-sm text-neon">03.</span>
          <h1 className="text-3xl font-bold text-text-primary">{t("title")}</h1>
          <div className="h-px flex-1 bg-carbon-border" />
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
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
      </div>
    </div>
  );
}
