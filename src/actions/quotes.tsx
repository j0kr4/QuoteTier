import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const GetAllAutor = () => {
  return prisma.author.findMany();
};

export const GetAllQuotes = () => {
  return prisma.quote.findMany({
    include: { author: true },
    orderBy: { likes: "desc" },
  });
};

export default async function CreateQuote(text: any, authorId: any) {
  const authorIdInt = parseInt(authorId);
  const quote = await prisma.quote.create({
    data: {
      text,
      authorId: authorIdInt,
    },
  });
  return Response.json({ message: "ok", status: 200, data: quote });
}

export const UpdateQuote = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { id, likes, dislikes } = req.body;
  return prisma.quote.update({
    where: { id },
    data: { likes, dislikes },
  });
};

export const deleteQuote = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { id } = req.body;
  return prisma.quote.delete({ where: { id } });
};
