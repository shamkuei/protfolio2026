import { setRequestLocale } from "next-intl/server";
import { ExperienceEditorClient } from "./editor-client";

export default async function NewExperiencePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ExperienceEditorClient experience={null} />;
}
