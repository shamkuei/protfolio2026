import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await req.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const uploadsDir = path.join(process.cwd(), "public", "uploads");
  await mkdir(uploadsDir, { recursive: true });

  const fileName = `${Date.now()}-${file.name.replace(/\s/g, "_")}`;
  const filePath = path.join(uploadsDir, fileName);

  await writeFile(filePath, buffer);

  const url = `/uploads/${fileName}`;

  const media = await prisma.media.create({
    data: {
      filename: fileName,
      originalName: file.name,
      mimeType: file.type,
      size: file.size,
      path: url,
      url,
      uploaderId: session.user.id!,
    },
  });

  return NextResponse.json({ ...media }, { status: 201 });
}
