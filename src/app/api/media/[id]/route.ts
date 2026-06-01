import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { unlink } from "fs/promises";
import path from "path";

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

  const media = await prisma.media.update({
    where: { id },
    data: {
      altEn: body.altEn || null,
      altFa: body.altFa || null,
    },
  });

  return NextResponse.json(media);
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
  const media = await prisma.media.findUnique({ where: { id } });

  if (!media) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  try {
    const filePath = path.join(process.cwd(), "public", media.path.replace(/^\//, ""));
    await unlink(filePath);
  } catch {
    // file may already be gone
  }

  await prisma.media.delete({ where: { id } });

  return NextResponse.json({ success: true });
}
