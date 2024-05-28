import { GetAllAutor } from "@/actions/quotes";
import { NextResponse } from "next/server";

export const GET = async () => {
  const allQuotes = await GetAllAutor();
  if (allQuotes.length) {
    return NextResponse.json(allQuotes, { status: 200 });
  }
  return NextResponse.json(
    { error: "Error: No Autor were found." },
    { status: 404 }
  );
};
