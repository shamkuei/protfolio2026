import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { ProjectsListClient } from "./projects-list-client";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function ProjectsPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ProjectsListClient locale={locale} />;
}
