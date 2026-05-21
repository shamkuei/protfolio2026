import { setRequestLocale } from "next-intl/server";
import { AboutSection } from "@/components/about/about-section";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function AboutPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <AboutSection />;
}
