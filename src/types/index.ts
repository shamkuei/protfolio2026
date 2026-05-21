export type Locale = "en" | "fa";

export interface NavItem {
  href: string;
  label: string;
}

export interface SocialLinkData {
  platform: string;
  url: string;
  icon: string;
}

export interface ProjectData {
  id: string;
  titleEn: string;
  titleFa: string;
  descriptionEn: string;
  descriptionFa: string;
  slug: string;
  repoUrl: string | null;
  liveUrl: string | null;
  status: string;
  screenshots: { url: string; caption: string }[];
  caseStudies: {
    titleEn: string;
    titleFa: string;
    contentEn: string;
    contentFa: string;
  }[];
  techStack: { name: string; category: string }[];
  githubData?: {
    stars: number;
    language: string | null;
    forks: number;
  };
}

export interface PostData {
  id: string;
  titleEn: string;
  titleFa: string;
  excerptEn: string | null;
  excerptFa: string | null;
  slug: string;
  contentEn: string;
  contentFa: string;
  status: string;
  coverImage: string | null;
  publishedAt: Date | null;
  categories: { id: string; nameEn: string; nameFa: string; slug: string }[];
}
