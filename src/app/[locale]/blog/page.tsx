import { setRequestLocale } from "next-intl/server";
import { BlogListClient } from "./blog-list-client";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function BlogPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <BlogListClient locale={locale} />;
}
