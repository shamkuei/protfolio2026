import { setRequestLocale } from "next-intl/server";
import { DashboardClient } from "./dashboard-client";

export default async function AdminDashboard({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <DashboardClient />;
}
