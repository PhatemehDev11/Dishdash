import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getFavoriteFoodIds, toggleFavorite } from "@/lib/favorites";

export async function GET() {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ foodIds: [] });
  }

  const userId = (session.user as { id: string }).id;
  const foodIds = await getFavoriteFoodIds(userId);
  return NextResponse.json({ foodIds });
}

export async function POST(req: Request) {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { foodId } = await req.json();

  if (!foodId) {
    return NextResponse.json({ error: "foodId is required" }, { status: 400 });
  }

  const userId = (session.user as { id: string }).id;
  const result = await toggleFavorite(userId, foodId);

  return NextResponse.json(result);
}
