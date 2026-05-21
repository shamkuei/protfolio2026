import { setRequestLocale } from "next-intl/server";
import { PostEditorClient } from "./editor-client";

export default async function NewPostPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <PostEditorClient post={null} />;
}
