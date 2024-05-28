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

export const CreateQuote = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { authorId, text } = req.body;
  return prisma.quote.create({
    data: {
      text,
      authorId,
    },
  });
};

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
