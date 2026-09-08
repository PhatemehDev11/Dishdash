import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/adminAuth";
import { adminUpdateOrderStatus, type OrderStatusValue } from "@/lib/adminOrders";

const VALID_STATUSES: OrderStatusValue[] = [
  "PENDING",
  "CONFIRMED",
  "PREPARING",
  "ON_THE_WAY",
  "DELIVERED",
  "CANCELLED",
];

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await requireAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await params;
  const { status } = await req.json();

  if (!VALID_STATUSES.includes(status)) {
    return NextResponse.json({ error: "Invalid status." }, { status: 400 });
  }

  const order = await adminUpdateOrderStatus(id, status);
  return NextResponse.json({ order });
}
