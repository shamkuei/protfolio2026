import { setRequestLocale } from "next-intl/server";
import { MediaClient } from "./media-client";

export default async function MediaPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <MediaClient />;
}
