import {
  findAllBooks,
  findBookById,
  findBooksByTitle,
  findBooksByAuthor,
  createBook,
  updateBook,
  deleteBook,
} from '../repositories/bookRepository';

import { BookInterface } from '../interfaces/bookInterface';

export const getAllBooks = async () => findAllBooks();

export const getBookById = async (bookId: number) => findBookById(bookId);

export const getBooksByTitle = async (title: string) => findBooksByTitle(title);

export const getBooksByAuthor = async (author: string) => findBooksByAuthor(author);

export const addBook = (book: BookInterface) => createBook(book);

export const editBook = async (bookId: number, book: BookInterface) => updateBook(bookId, book);

export const deleteBookItem = async (bookId: number) => {
  const deletedCount = await deleteBook(bookId);

  if (!deletedCount) {
    throw new Error('Book not found or already deleted');
  }
};
