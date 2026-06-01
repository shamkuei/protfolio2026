import { setRequestLocale } from "next-intl/server";
import { CategoriesAdminClient } from "./categories-client";

export default async function AdminCategoriesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <CategoriesAdminClient />;
}
