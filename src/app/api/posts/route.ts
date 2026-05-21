import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET() {
  const posts = await prisma.post.findMany({
    where: { status: "PUBLISHED" },
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
  const post = await prisma.post.create({
    data: {
      titleEn: body.titleEn,
      titleFa: body.titleFa,
      slug: body.slug,
      contentEn: body.contentEn,
      contentFa: body.contentFa,
      excerptEn: body.excerptEn,
      excerptFa: body.excerptFa,
      coverImage: body.coverImage,
      status: body.status || "DRAFT",
      publishedAt: body.status === "PUBLISHED" ? new Date() : null,
    },
  });

  return NextResponse.json(post, { status: 201 });
}
