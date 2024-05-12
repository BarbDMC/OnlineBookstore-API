
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.user.createMany({
    data: [
      {
        idUser: 1,
        email: 'admin@example.com',
        name: 'Admin',
        surname: 'User',
        password: '$2a$12$68/zZLfnwN3Yxn.OvMO7YumW4mj/mrVfIkoO34MOrs39rVHVQRDV6',
        birthday: new Date('1990-01-01'),
        role: 0
      },
      {
        idUser: 2,
        email: 'client@example.com',
        name: 'Client',
        surname: 'User',
        password: '$2a$12$68/zZLfnwN3Yxn.OvMO7YumW4mj/mrVfIkoO34MOrs39rVHVQRDV6',
        birthday: new Date('1990-01-01'),
        role: 1
      }
    ]
  });

  const response = await fetch(`https://api.nytimes.com/svc/books/v3/lists/full-overview.json?api-key=${process.env.NYTIMES_API_KEY}`);
  const data = await response.json();

  const books = data.results.lists.flatMap((list: any) => {
    return list.books.map((book: any) => ({
      title: book.title,
      author: book.author,
      description: book.description,
      price: Math.floor(Math.random() * 81) + 20,
      inventory: Math.floor(Math.random() * 20),
      image: book.book_image
    }));
  });

  await prisma.book.createMany({
    data: books
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });