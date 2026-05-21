import { setRequestLocale } from "next-intl/server";
import { ProjectsAdminClient } from "./projects-client";

export default async function AdminProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ProjectsAdminClient />;
}
