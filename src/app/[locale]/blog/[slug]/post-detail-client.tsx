import { formatDate } from "@/lib/utils";
import { MarkdownContent } from "@/components/blog/markdown-content";
import { HiCalendar, HiClock } from "react-icons/hi";

interface PostDetailClientProps {
  post: {
    titleEn: string;
    titleFa: string;
    contentEn: string;
    contentFa: string;
    publishedAt: string;
    readingTime: number;
    categories: { name: string; slug: string }[];
  };
  locale: string;
  t: (key: string, params?: Record<string, unknown>) => string;
}

export function PostDetail({
  post,
  locale,
  t,
}: PostDetailClientProps) {
  const title = locale === "fa" ? post.titleFa : post.titleEn;
  const content = locale === "fa" ? post.contentFa : post.contentEn;

  return (
    <article className="space-y-8">
      {/* Header */}
      <header className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {post.categories.map((cat) => (
            <span
              key={cat.slug}
              className="rounded bg-neon/10 px-2 py-0.5 font-mono text-xs text-neon"
            >
              {cat.name}
            </span>
          ))}
        </div>
        <h1 className="text-3xl font-bold text-text-primary sm:text-4xl">
          {title}
        </h1>
        <div className="flex items-center gap-4 font-mono text-sm text-text-muted">
          <span className="flex items-center gap-1.5">
            <HiCalendar size={14} />
            {formatDate(post.publishedAt, locale)}
          </span>
          <span className="flex items-center gap-1.5">
            <HiClock size={14} />
            {t("minRead", { time: post.readingTime })}
          </span>
        </div>
        <div className="h-px bg-carbon-border" />
      </header>

      {/* Content */}
      <MarkdownContent source={content} />
    </article>
  );
}
