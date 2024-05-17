import db from '../prisma/index';
import { BookInterface } from '../interfaces/bookInterface';

export const findAllBooks = () => db.book.findMany();

export const findBookById = (id: number) => db.book.findUnique({ where: { id } });

export const createBook = (book: Omit<BookInterface, 'id'>) => db.book.create({ data: book });

export const updateBook = (id: number, book: Omit<BookInterface, 'id'>) => db.book.update({ where: { id }, data: book });

export const deleteBook = (id: number) => db.book.delete({ where: { id } });

export const findBooksByTitle = (title: string) =>
  db.book.findMany({
    where: {
      title: {
        contains: title,
        mode: 'insensitive',
      },
    },
  });

export const findBooksByAuthor = (author: string) =>
  db.book.findMany({
    where: {
      author: {
        contains: author,
        mode: 'insensitive',
      },
  },
});
