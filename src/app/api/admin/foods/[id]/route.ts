import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/adminAuth";
import { adminUpdateFood, adminDeleteFood } from "@/lib/adminFoods";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await requireAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await params;
  const body = await req.json();

  try {
    const food = await adminUpdateFood(id, body);
    return NextResponse.json({ food });
  } catch {
    return NextResponse.json({ error: "Could not update food item." }, { status: 400 });
  }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await requireAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await params;

  try {
    await adminDeleteFood(id);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Can't delete a food item that's part of a past order." },
      { status: 400 }
    );
  }
}
