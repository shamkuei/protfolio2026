import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { PostEditorClient } from "../../new/editor-client";

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  setRequestLocale(locale);

  const post = await prisma.post.findUnique({
    where: { id },
  });

  if (!post || post.deletedAt) {
    notFound();
  }

  return (
    <PostEditorClient
      post={{
        id: post.id,
        titleEn: post.titleEn,
        titleFa: post.titleFa,
        slug: post.slugEn,
        contentEn: post.contentEn || "",
        contentFa: post.contentFa || "",
        excerptEn: post.excerptEn || "",
        excerptFa: post.excerptFa || "",
        status: post.status,
      }}
    />
  );
}
