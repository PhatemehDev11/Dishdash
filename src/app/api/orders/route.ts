import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { createOrder } from "@/lib/orders";

export async function POST(req: Request) {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { addressId } = await req.json();

  if (!addressId) {
    return NextResponse.json({ error: "addressId is required" }, { status: 400 });
  }

  const userId = (session.user as { id: string }).id;

  try {
    const order = await createOrder(userId, addressId);
    return NextResponse.json({ order });
  } catch {
    return NextResponse.json({ error: "Could not place order." }, { status: 400 });
  }
}
