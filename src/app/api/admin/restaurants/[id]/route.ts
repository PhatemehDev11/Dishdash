import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/adminAuth";
import { adminUpdateRestaurant, adminDeleteRestaurant } from "@/lib/adminRestaurants";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await requireAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await params;
  const body = await req.json();

  try {
    const restaurant = await adminUpdateRestaurant(id, body);
    return NextResponse.json({ restaurant });
  } catch {
    return NextResponse.json({ error: "Could not update restaurant." }, { status: 400 });
  }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await requireAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await params;

  try {
    await adminDeleteRestaurant(id);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Can't delete a restaurant that still has menu items or orders." },
      { status: 400 }
    );
  }
}
