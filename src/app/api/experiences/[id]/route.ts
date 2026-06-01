import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const experience = await prisma.experience.findUnique({ where: { id } });

  if (!experience || experience.deletedAt) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(experience);
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

  const existing = await prisma.experience.findUnique({ where: { id } });
  if (!existing || existing.deletedAt) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const experience = await prisma.experience.update({
    where: { id },
    data: {
      type: body.type,
      titleEn: body.titleEn,
      titleFa: body.titleFa,
      companyEn: body.companyEn || null,
      companyFa: body.companyFa || null,
      locationEn: body.locationEn || null,
      locationFa: body.locationFa || null,
      descriptionEn: body.descriptionEn || null,
      descriptionFa: body.descriptionFa || null,
      startDate: new Date(body.startDate),
      endDate: body.endDate ? new Date(body.endDate) : null,
      order: body.order ?? 0,
      url: body.url || null,
    },
  });

  return NextResponse.json(experience);
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
  await prisma.experience.update({
    where: { id },
    data: { deletedAt: new Date() },
  });

  return NextResponse.json({ success: true });
}
