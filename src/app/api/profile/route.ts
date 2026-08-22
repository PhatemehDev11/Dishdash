import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PATCH(req: Request) {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = (session.user as { id: string }).id;
  const body = await req.json();
  const data: { name?: string; password?: string } = {};

  if (body.name) {
    data.name = body.name;
  }

  if (body.newPassword) {
    if (!body.currentPassword) {
      return NextResponse.json({ error: "Current password is required." }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    const isValid = await bcrypt.compare(body.currentPassword, user.password);
    if (!isValid) {
      return NextResponse.json({ error: "Current password is incorrect." }, { status: 400 });
    }

    if (body.newPassword.length < 6) {
      return NextResponse.json(
        { error: "New password must be at least 6 characters." },
        { status: 400 }
      );
    }

    data.password = await bcrypt.hash(body.newPassword, 10);
  }

  const updated = await prisma.user.update({ where: { id: userId }, data });

  return NextResponse.json({ name: updated.name });
}
