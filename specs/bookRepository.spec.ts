import {
  findAllBooks,
  findBookById,
  createBook,
  updateBook,
  deleteBook,
} from '../repositories/bookRepository';

import { books } from './fixtures/books';
import { BookInterface } from '../interfaces/bookInterface';
import { prismaTestContext } from './context/prismaContext';

describe('Books Repository', () => {
  beforeAll(async () => {
    const db = await prismaTestContext().before();
    await db.book.createMany({data: books});
  });

  afterAll(async () => {
    await prismaTestContext().after();
  });

  describe('findAllBooks', () => {
    it('should return all books', async () => {
      const books = await findAllBooks();
      expect(books.length).toBe(2);
    });
  });

  describe('findBookById', () => {
    it('should return a book by id', async () => {
      const books = await findAllBooks();
      const bookId = books[0].id;
      const book = await findBookById(bookId);
      expect(book).not.toBeNull();
    });
  });

  describe('createBook', () => {
    it('should create a book', async () => {
      const newBook = {
        id: 3,
        title: 'New Book',
        author: 'New Author',
        description: 'New Description',
        price: 9.99,
        inventory: 50,
        image: 'new-book-image.jpg',
      };

      const createdBook = await createBook(newBook);
      expect(createdBook.title).toBe(newBook.title);
    });
  });

  describe('updateBook', () => {
    it('should update a book', async () => {
      const books = await findAllBooks();
      const bookId = books[0].id;
      const bookChanges = { 
        ...books[0], 
        title: 'Updated Title', 
        price: 19.99, 
        image: 'new-image.jpg' 
      };

      await updateBook(bookId, bookChanges);
      const updatedBook = await findBookById(bookId);
      expect(updatedBook?.title).toBe('Updated Title');
      expect(updatedBook?.price).toBe(19.99);
    });
  });

  describe('deleteBook', () => {
    it('should delete a book', async () => {
      const books = await findAllBooks();
      const bookId = books[0].id;

      await deleteBook(bookId);
      const deletedBook = await findBookById(bookId);
      expect(deletedBook).toBeNull();
    });
  });
});
