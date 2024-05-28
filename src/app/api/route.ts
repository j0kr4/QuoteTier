import CreateQuote, { GetAllQuotes, UpdateQuote } from "@/actions/quotes";
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
export const POST = async (req: Request) => {
  const body = await req.json();

  const result = await CreateQuote(body.text, body.authorId);

  if (!result)
    return Response.json({
      message: "error",
      status: 500,
    });
  return Response.json({ message: "ok", status: 200, data: result });
};

export const PUT = async (req: NextApiRequestQuery) => {
  return Response.json({ massage: "ok", status: 200, data: req.query });
};
