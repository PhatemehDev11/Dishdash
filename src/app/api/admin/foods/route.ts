import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/adminAuth";
import { adminCreateFood } from "@/lib/adminFoods";

export async function POST(req: Request) {
  const session = await requireAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await req.json();

  if (!body.restaurantId || !body.name || !body.price) {
    return NextResponse.json(
      { error: "Restaurant, name, and price are required." },
      { status: 400 }
    );
  }

  try {
    const food = await adminCreateFood(body);
    return NextResponse.json({ food });
  } catch {
    return NextResponse.json({ error: "Could not create food item." }, { status: 400 });
  }
}
