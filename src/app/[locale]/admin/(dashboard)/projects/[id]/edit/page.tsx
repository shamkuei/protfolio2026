import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ProjectEditorClient } from "../../new/editor-client";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  setRequestLocale(locale);

  const project = await prisma.project.findUnique({
    where: { id },
    include: {
      techStack: { include: { techStack: true } },
    },
  });

  if (!project || project.deletedAt) {
    notFound();
  }

  return (
    <ProjectEditorClient
      project={{
        id: project.id,
        titleEn: project.titleEn,
        titleFa: project.titleFa,
        slug: project.slug,
        descriptionEn: project.descriptionEn,
        descriptionFa: project.descriptionFa,
        repoUrl: project.repoUrl || "",
        liveUrl: project.liveUrl || "",
        status: project.status,
      }}
    />
  );
}
