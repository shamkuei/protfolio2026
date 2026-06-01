import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

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

  const tech = await prisma.techStack.update({
    where: { id },
    data: {
      name: body.name,
      icon: body.icon || null,
      color: body.color || null,
      category: body.category,
      order: body.order ?? 0,
    },
  });

  return NextResponse.json(tech);
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
  await prisma.techStack.delete({ where: { id } });

  return NextResponse.json({ success: true });
}
