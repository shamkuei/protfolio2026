import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const all = searchParams.get("all");

  if (all === "true") {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const posts = await prisma.post.findMany({
      where: { deletedAt: null },
      include: {
        categories: { include: { category: true } },
        author: { select: { id: true, name: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(posts);
  }

  const posts = await prisma.post.findMany({
    where: { status: "PUBLISHED", deletedAt: null },
    include: {
      categories: { include: { category: true } },
    },
    orderBy: { publishedAt: "desc" },
  });

  return NextResponse.json(posts);
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const slugEn = body.slug || body.slugEn || "";
  const slugFa =
    body.slugFa || body.titleFa?.replace(/\s+/g, "-").toLowerCase() || "";

  const post = await prisma.post.create({
    data: {
      titleEn: body.titleEn,
      titleFa: body.titleFa,
      slugEn,
      slugFa,
      contentEn: body.contentEn,
      contentFa: body.contentFa,
      excerptEn: body.excerptEn,
      excerptFa: body.excerptFa,
      coverImage: body.coverImage,
      status: body.status || "DRAFT",
      publishedAt: body.status === "PUBLISHED" ? new Date() : null,
      readingTimeEn: body.contentEn
        ? Math.ceil(body.contentEn.trim().split(/\s+/).length / 200)
        : null,
      readingTimeFa: body.contentFa
        ? Math.ceil(body.contentFa.trim().split(/\s+/).length / 200)
        : null,
      authorId: session.user.id!,
    },
  });

  return NextResponse.json(post, { status: 201 });
}
