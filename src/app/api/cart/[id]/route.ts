import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { updateCartItemQuantity, removeCartItem } from "@/lib/cart";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const { quantity } = await req.json();
  const userId = (session.user as { id: string }).id;

  await updateCartItemQuantity(userId, id, quantity);
  return NextResponse.json({ ok: true });
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const userId = (session.user as { id: string }).id;

  await removeCartItem(userId, id);
  return NextResponse.json({ ok: true });
}
