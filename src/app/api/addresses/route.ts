import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getUserAddresses, createAddress } from "@/lib/addresses";

export async function GET() {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ addresses: [] });
  }

  const userId = (session.user as { id: string }).id;
  const addresses = await getUserAddresses(userId);
  return NextResponse.json({ addresses });
}

export async function POST(req: Request) {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();

  if (!body.label || !body.street || !body.city) {
    return NextResponse.json(
      { error: "Label, street, and city are required." },
      { status: 400 }
    );
  }

  const userId = (session.user as { id: string }).id;
  const address = await createAddress(userId, body);
  return NextResponse.json({ address });
}