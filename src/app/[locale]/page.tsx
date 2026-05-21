import { setRequestLocale } from "next-intl/server";
import { HeroSection } from "@/components/hero/hero-section";
import { AboutSection } from "@/components/about/about-section";
import { ProjectsPreview } from "@/components/projects/projects-preview";
import { BlogPreview } from "@/components/blog/blog-preview";
import { DevOpsSection } from "@/components/devops/devops-section";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <HeroSection />
      <AboutSection />
      <ProjectsPreview />
      <BlogPreview />
      <DevOpsSection />
    </>
  );
}
