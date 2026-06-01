import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ExperienceEditorClient } from "../../new/editor-client";

export default async function EditExperiencePage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  setRequestLocale(locale);

  const exp = await prisma.experience.findUnique({ where: { id } });

  if (!exp || exp.deletedAt) {
    notFound();
  }

  return (
    <ExperienceEditorClient
      experience={{
        id: exp.id,
        type: exp.type,
        titleEn: exp.titleEn,
        titleFa: exp.titleFa,
        companyEn: exp.companyEn || "",
        companyFa: exp.companyFa || "",
        locationEn: exp.locationEn || "",
        locationFa: exp.locationFa || "",
        descriptionEn: exp.descriptionEn || "",
        descriptionFa: exp.descriptionFa || "",
        startDate: exp.startDate.toISOString(),
        endDate: exp.endDate?.toISOString() || "",
        url: exp.url || "",
        order: exp.order,
      }}
    />
  );
}
