import { setRequestLocale } from "next-intl/server";
import { TechStackClient } from "./tech-stack-client";

export default async function TechStackPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <TechStackClient />;
}
