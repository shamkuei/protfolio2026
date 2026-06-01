import { setRequestLocale } from "next-intl/server";
import { PostsAdminClient } from "./posts-client";

export default async function AdminPostsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <PostsAdminClient />;
}
