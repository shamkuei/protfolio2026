import { setRequestLocale } from "next-intl/server";
import { PostEditorClient } from "../../new/editor-client";

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  // In production, fetch post from DB
  const post = {
    id: "1",
    titleEn: "Building Scalable Applications",
    titleFa: "ساخت برنامه‌های مقیاس‌پذیر",
    slug: "building-scalable-apps",
    contentEn: "Post content here...",
    contentFa: "محتوای پست اینجا...",
    excerptEn: "A deep dive into...",
    excerptFa: "بررسی عمیق...",
    status: "PUBLISHED",
  };

  return <PostEditorClient post={post} />;
}
