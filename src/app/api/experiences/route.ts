import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET() {
  const experiences = await prisma.experience.findMany({
    where: { deletedAt: null },
    orderBy: [{ type: "asc" }, { order: "asc" }],
  });
  return NextResponse.json(experiences);
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const experience = await prisma.experience.create({
    data: {
      type: body.type || "WORK",
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
      order: body.order || 0,
      url: body.url || null,
    },
  });

  return NextResponse.json(experience, { status: 201 });
}
