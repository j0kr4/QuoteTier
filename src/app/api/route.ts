import { CreateQuote, GetAllQuotes } from "@/actions/quotes";
import { NextApiRequestQuery } from "next/dist/server/api-utils";
import { NextResponse } from "next/server";

export const GET = async () => {
  const allQuotes = await GetAllQuotes();
  if (allQuotes.length) {
    return NextResponse.json(allQuotes, { status: 200 });
  }
  return NextResponse.json(
    { error: "Error: No quote were found." },
    { status: 404 }
  );
};

export const POST = async (req: NextApiRequestQuery) => {
  console.log(req.body);
  return CreateQuote(authorId, text);
};
