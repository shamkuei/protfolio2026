import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET() {
  const categories = await prisma.category.findMany({
    orderBy: { nameEn: "asc" },
  });
  return NextResponse.json(categories);
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const category = await prisma.category.create({
    data: {
      nameEn: body.nameEn,
      nameFa: body.nameFa,
      slug: body.slug,
    },
  });

  return NextResponse.json(category, { status: 201 });
}
