import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getCartItems, addToCart } from "@/lib/cart";

export async function GET() {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ items: [] });
  }

  const userId = (session.user as { id: string }).id;
  const items = await getCartItems(userId);
  return NextResponse.json({ items });
}

export async function POST(req: Request) {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { foodId, quantity = 1 } = await req.json();

  if (!foodId) {
    return NextResponse.json({ error: "foodId is required" }, { status: 400 });
  }

  const userId = (session.user as { id: string }).id;
  await addToCart(userId, foodId, quantity);

  return NextResponse.json({ ok: true });
}
