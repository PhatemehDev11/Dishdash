import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { deleteAddress, setDefaultAddress } from "@/lib/addresses";

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const userId = (session.user as { id: string }).id;

  await deleteAddress(userId, id);
  return NextResponse.json({ ok: true });
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await req.json();
  const userId = (session.user as { id: string }).id;

  if (body.isDefault) {
    await setDefaultAddress(userId, id);
  }

  return NextResponse.json({ ok: true });
}