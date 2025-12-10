import { NextResponse } from "next/server";

import { initializeSearch, search } from "@/lib/search";

// Initialize search on module load
initializeSearch();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");

  if (!query) {
    return NextResponse.json({ results: [] });
  }

  const results = search(query);
  return NextResponse.json({ results });
}
