"use client";

import { useTranslations } from "next-intl";
import { PostCard } from "@/components/blog/post-card";

const posts = [
  {
    slug: "building-scalable-apps",
    titleEn: "Building Scalable Applications with Next.js",
    titleFa: "ساخت برنامه‌های مقیاس‌پذیر با Next.js",
    excerptEn: "A deep dive into server components, streaming, and caching strategies for production-grade Next.js apps.",
    excerptFa: "بررسی عمیق کامپوننت‌های سرور، استریم و استراتژی‌های کش برای برنامه‌های Next.js در سطح پروداکشن.",
    readingTime: 8,
    publishedAt: "2025-05-01",
    categories: [{ name: "Next.js", slug: "nextjs" }],
  },
  {
    slug: "docker-in-production",
    titleEn: "Docker in Production: Lessons Learned",
    titleFa: "داکر در پروداکشن: درس‌های آموخته شده",
    excerptEn: "Real-world patterns for container orchestration, multi-stage builds, and health checks that actually work.",
    excerptFa: "الگوهای واقعی برای ارکستریشن کانتینر، بیلدهای چند مرحله‌ای و چک‌های سلامتی که واقعاً کار می‌کنند.",
    readingTime: 12,
    publishedAt: "2025-04-15",
    categories: [{ name: "Docker", slug: "docker" }],
  },
  {
    slug: "typescript-advanced-patterns",
    titleEn: "Advanced TypeScript Patterns for Full-Stack Devs",
    titleFa: "الگوهای پیشرفته TypeScript برای توسعه‌دهندگان فول‌استک",
    excerptEn: "Template literal types, conditional types, and mapped types that will level up your codebase.",
    excerptFa: "انواع قالب لیترال، انواع شرطی و انواع نگاشت شده که کدبیس شما را ارتقا می‌دهند.",
    readingTime: 10,
    publishedAt: "2025-03-20",
    categories: [{ name: "TypeScript", slug: "typescript" }],
  },
];

export function BlogListClient({ locale }: { locale: string }) {
  const t = useTranslations("blog");

  return (
    <div className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-12">
        <div className="flex items-center gap-4">
          <span className="font-mono text-sm text-neon">04.</span>
          <h1 className="text-3xl font-bold text-text-primary">{t("title")}</h1>
          <div className="h-px flex-1 bg-carbon-border" />
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard
              key={post.slug}
              slug={post.slug}
              title={locale === "fa" ? post.titleFa : post.titleEn}
              excerpt={locale === "fa" ? post.excerptFa : post.excerptEn}
              coverImage={null}
              publishedAt={post.publishedAt}
              readingTime={post.readingTime}
              categories={post.categories}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
