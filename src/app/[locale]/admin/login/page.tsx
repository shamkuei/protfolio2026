import { setRequestLocale } from "next-intl/server";
import { LoginClient } from "./login-client";

export default async function AdminLoginPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <LoginClient />;
}
