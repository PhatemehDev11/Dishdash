import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/adminAuth";
import { adminCreateRestaurant } from "@/lib/adminRestaurants";

export async function POST(req: Request) {
  const session = await requireAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await req.json();

  if (!body.slug || !body.name) {
    return NextResponse.json({ error: "Slug and name are required." }, { status: 400 });
  }

  try {
    const restaurant = await adminCreateRestaurant(body);
    return NextResponse.json({ restaurant });
  } catch {
    return NextResponse.json({ error: "Slug must be unique." }, { status: 400 });
  }
}
