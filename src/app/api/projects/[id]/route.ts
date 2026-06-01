import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const project = await prisma.project.findUnique({
    where: { id },
    include: {
      screenshots: { orderBy: { order: "asc" } },
      caseStudy: true,
      techStack: { include: { techStack: true } },
    },
  });

  if (!project || project.deletedAt) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(project);
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await req.json();

  const existing = await prisma.project.findUnique({ where: { id } });
  if (!existing || existing.deletedAt) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const project = await prisma.project.update({
    where: { id },
    data: {
      titleEn: body.titleEn,
      titleFa: body.titleFa,
      slug: body.slug,
      descriptionEn: body.descriptionEn,
      descriptionFa: body.descriptionFa,
      longDescriptionEn: body.longDescriptionEn,
      longDescriptionFa: body.longDescriptionFa,
      repoUrl: body.repoUrl,
      liveUrl: body.liveUrl,
      thumbnailUrl: body.thumbnailUrl,
      status: body.status,
      featured: body.featured,
      order: body.order,
    },
  });

  return NextResponse.json(project);
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const project = await prisma.project.update({
    where: { id },
    data: { deletedAt: new Date() },
  });

  return NextResponse.json(project);
}
