import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { Link } from "@/config/routing";
import { PostDetail } from "./post-detail-client";

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export default async function BlogPostPage({ params }: PageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("blog");

  // Placeholder — in production, fetch from DB/MDX
  const post = {
    slug,
    titleEn: "Building Scalable Applications with Next.js",
    titleFa: "ساخت برنامه‌های مقیاس‌پذیر با Next.js",
    contentEn: `
## Introduction

Building scalable applications requires careful consideration of architecture, caching, and rendering strategies.

## Server Components

React Server Components allow us to render components on the server, reducing the JavaScript bundle sent to the client.

\`\`\`typescript
// This component runs on the server
async function PostList() {
  const posts = await db.post.findMany();
  return (
    <ul>
      {posts.map(post => <li key={post.id}>{post.title}</li>)}
    </ul>
  );
}
\`\`\`

## Caching Strategies

Next.js provides multiple caching layers:
- **Request Memoization** — deduplication of identical requests
- **Data Cache** — persistent across deployments
- **Full Route Cache** — static rendering at build time
- **Router Cache** — client-side navigation cache

## Conclusion

By leveraging these features, we can build applications that scale effortlessly.
    `,
    contentFa: `
## مقدمه

ساخت برنامه‌های مقیاس‌پذیر نیازمند توجه دقیق به معماری، کش و استراتژی‌های رندرینگ است.

## کامپوننت‌های سرور

React Server Components به ما اجازه می‌دهند کامپوننت‌ها را در سرور رندر کنیم و حجم جاوااسکریپت ارسالی به کلاینت را کاهش دهیم.

\`\`\`typescript
// این کامپوننت در سرور اجرا می‌شود
async function PostList() {
  const posts = await db.post.findMany();
  return (
    <ul>
      {posts.map(post => <li key={post.id}>{post.title}</li>)}
    </ul>
  );
}
\`\`\`

## استراتژی‌های کش

Next.js لایه‌های کش متعددی ارائه می‌دهد:
- **ممنوعسازی درخواست** — حذف درخواست‌های تکراری
- **کش داده** — پایدار در طول استقرارها
- **کش مسیر کامل** — رندر ایستا در زمان بیلد
- **کش روتر** — کش ناوبری سمت کلاینت

## نتیجه‌گیری

با استفاده از این قابلیت‌ها، می‌توانیم برنامه‌هایی بسازیم که به راحتی مقیاس‌پذیر باشند.
    `,
    publishedAt: "2025-05-01",
    readingTime: 8,
    categories: [{ name: "Next.js", slug: "nextjs" }, { name: "Architecture", slug: "architecture" }],
  };

  return (
    <div className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/blog"
          className="mb-8 inline-block font-mono text-sm text-text-muted transition-colors hover:text-neon"
        >
          {t("backToBlog")}
        </Link>
        <PostDetail post={post} locale={locale} t={t} />
      </div>
    </div>
  );
}
