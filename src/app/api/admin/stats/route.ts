import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const [posts, projects, categories, viewsResult] = await Promise.all([
    prisma.post.count({ where: { deletedAt: null } }),
    prisma.project.count({ where: { deletedAt: null } }),
    prisma.category.count(),
    prisma.post.aggregate({
      _sum: { viewCount: true },
      where: { deletedAt: null },
    }),
  ]);

  return NextResponse.json({
    posts,
    projects,
    categories,
    views: viewsResult._sum.viewCount || 0,
  });
}
