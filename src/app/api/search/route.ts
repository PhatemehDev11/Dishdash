import { NextResponse } from "next/server";
import { searchAll } from "@/lib/search";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") ?? "";
  const results = await searchAll(q);
  return NextResponse.json(results);
}
