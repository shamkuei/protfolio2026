import { setRequestLocale } from "next-intl/server";
import { ExperiencesClient } from "./experiences-client";

export default async function ExperiencesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ExperiencesClient />;
}
