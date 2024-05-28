const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  const author1 = await prisma.author.create({
    data: {
      name: "Author 1",
      verified: true,
      quotes: {
        create: [
          { text: "Quote 1 from Author 1", likes: 10, dislikes: 2 },
          { text: "Quote 2 from Author 1", likes: 15, dislikes: 1 },
        ],
      },
    },
  });

  const author2 = await prisma.author.create({
    data: {
      name: "Author 2",
      verified: false,
      quotes: {
        create: [
          { text: "Quote 1 from Author 2", likes: 5, dislikes: 0 },
          { text: "Quote 2 from Author 2", likes: 3, dislikes: 1 },
        ],
      },
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
