import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const post = await prisma.post.findUnique({
    where: { id },
    include: {
      categories: { include: { category: true } },
      tags: true,
      author: { select: { id: true, name: true, email: true } },
    },
  });

  if (!post || post.deletedAt) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(post);
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

  const existing = await prisma.post.findUnique({ where: { id } });
  if (!existing || existing.deletedAt) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const publishedAt =
    body.status === "PUBLISHED" && !existing.publishedAt
      ? new Date()
      : existing.publishedAt;

  const post = await prisma.post.update({
    where: { id },
    data: {
      titleEn: body.titleEn,
      titleFa: body.titleFa,
      slugEn: body.slug || body.slugEn,
      slugFa: body.slugFa || body.titleFa?.replace(/\s+/g, "-").toLowerCase(),
      contentEn: body.contentEn,
      contentFa: body.contentFa,
      excerptEn: body.excerptEn,
      excerptFa: body.excerptFa,
      coverImage: body.coverImage,
      status: body.status,
      publishedAt,
      readingTimeEn: body.contentEn
        ? Math.ceil(body.contentEn.trim().split(/\s+/).length / 200)
        : undefined,
      readingTimeFa: body.contentFa
        ? Math.ceil(body.contentFa.trim().split(/\s+/).length / 200)
        : undefined,
    },
  });

  return NextResponse.json(post);
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
  const post = await prisma.post.update({
    where: { id },
    data: { deletedAt: new Date() },
  });

  return NextResponse.json(post);
}
