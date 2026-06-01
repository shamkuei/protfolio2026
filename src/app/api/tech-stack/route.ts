import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET() {
  const techStack = await prisma.techStack.findMany({
    orderBy: [{ category: "asc" }, { order: "asc" }],
  });
  return NextResponse.json(techStack);
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();

  const tech = await prisma.techStack.create({
    data: {
      name: body.name,
      icon: body.icon || null,
      color: body.color || null,
      category: body.category || "TOOL",
      order: body.order || 0,
    },
  });

  return NextResponse.json(tech, { status: 201 });
}
