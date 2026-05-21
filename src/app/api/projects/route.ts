import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET() {
  const projects = await prisma.project.findMany({
    include: {
      screenshots: true,
      caseStudies: true,
      techStack: { include: { techStack: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(projects);
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const project = await prisma.project.create({
    data: {
      titleEn: body.titleEn,
      titleFa: body.titleFa,
      slug: body.slug,
      descriptionEn: body.descriptionEn,
      descriptionFa: body.descriptionFa,
      repoUrl: body.repoUrl,
      liveUrl: body.liveUrl,
      status: body.status || "ACTIVE",
    },
  });

  return NextResponse.json(project, { status: 201 });
}
