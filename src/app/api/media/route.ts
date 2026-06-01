import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");

  const where: Record<string, unknown> = {};
  if (type === "image") {
    where.mimeType = { startsWith: "image/" };
  } else if (type === "document") {
    where.mimeType = { startsWith: "application/" };
  }

  const media = await prisma.media.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(media);
}
