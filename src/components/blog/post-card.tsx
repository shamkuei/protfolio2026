"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/config/routing";
import { formatDate } from "@/lib/utils";
import { HiCalendar, HiClock } from "react-icons/hi";

interface PostCardProps {
  slug: string;
  title: string;
  excerpt: string | null;
  coverImage: string | null;
  publishedAt: string | null;
  readingTime: number;
  categories: { name: string; slug: string }[];
}

export function PostCard({
  slug,
  title,
  excerpt,
  coverImage,
  publishedAt,
  readingTime,
  categories,
}: PostCardProps) {
  const locale = useLocale();
  const t = useTranslations("blog");

  return (
    <article className="group rounded-lg border border-carbon-border bg-carbon-light p-6 transition-all hover:border-neon/20">
      {/* Categories */}
      {categories.length > 0 && (
        <div className="mb-3 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <span
              key={cat.slug}
              className="rounded bg-neon/10 px-2 py-0.5 font-mono text-xs text-neon"
            >
              {cat.name}
            </span>
          ))}
        </div>
      )}

      {/* Title */}
      <Link href={`/blog/${slug}`}>
        <h3 className="mb-2 text-lg font-semibold text-text-primary transition-colors group-hover:text-neon">
          {title}
        </h3>
      </Link>

      {/* Excerpt */}
      {excerpt && (
        <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-text-secondary">
          {excerpt}
        </p>
      )}

      {/* Meta */}
      <div className="flex items-center gap-4 font-mono text-xs text-text-muted">
        {publishedAt && (
          <span className="flex items-center gap-1">
            <HiCalendar size={12} />
            {formatDate(publishedAt, locale)}
          </span>
        )}
        <span className="flex items-center gap-1">
          <HiClock size={12} />
          {t("minRead", { time: readingTime })}
        </span>
      </div>
    </article>
  );
}
