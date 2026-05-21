import { setRequestLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { Link } from "@/config/routing";
import { ProjectDetailClient } from "./project-detail-client";

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  // In production, fetch from DB. Using placeholder for now.
  const project = {
    slug,
    titleEn: "Portfolio Website",
    titleFa: "وبسایت پورتفولیو",
    descriptionEn:
      "A modern bilingual portfolio and weblog built with Next.js 16, React 19, Prisma, and Docker. Features a cyberpunk-minimal design with real-time terminal animations and full MDX blog support.",
    descriptionFa:
      "یک پورتفولیو و وبلاگ دوزبانه مدرن ساخته شده با Next.js 16، React 19، Prisma و Docker. با طراحی سایبرپانک-مینیمال و انیمیشن‌های ترمینال و پشتیبانی کامل MDX.",
    repoUrl: "https://github.com",
    liveUrl: "#",
    techStack: ["Next.js", "React", "TypeScript", "TailwindCSS", "Prisma", "PostgreSQL", "Redis", "Docker"],
    screenshots: [
      { url: "/screenshots/1.png", caption: "Homepage" },
      { url: "/screenshots/2.png", caption: "Dashboard" },
      { url: "/screenshots/3.png", caption: "Blog" },
    ],
    githubData: { stars: 12, forks: 3, language: "TypeScript" },
    caseStudies: [
      {
        titleEn: "Architecture Decisions",
        titleFa: "تصمیمات معماری",
        contentEn: "Why I chose Next.js App Router with server components for optimal performance...",
        contentFa: "چرا من App Router Next.js با کامپوننت‌های سرور برای عملکرد بهینه انتخاب کردم...",
      },
    ],
  };

  return (
    <div className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/projects"
          className="mb-8 inline-block font-mono text-sm text-text-muted transition-colors hover:text-neon"
        >
          {locale === "fa" ? "← بازگشت به پروژه‌ها" : "← Back to Projects"}
        </Link>
        <ProjectDetailClient
          project={project}
          locale={locale}
        />
      </div>
    </div>
  );
}
