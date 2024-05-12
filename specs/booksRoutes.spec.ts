import express from 'express';
import request from 'supertest';
import { books } from './fixtures/books';
import booksRoutes from '../routes/booksRoutes';
import { prismaTestContext } from './context/prismaContext';

const app = express();
app.use(express.json());
app.use(booksRoutes);

describe('BooksRouter', () => {
  beforeAll(async () => {
    const db = await prismaTestContext().before();
    await db.book.create({ data: books[0] });
  });

  afterAll(async () => {
    await prismaTestContext().after();
  });

  describe('When get books', () => {
    it('returns status 200 and a list of books', async () => {
      const response = await request(app)
        .get('/books');

      expect(response.statusCode).toBe(200);
      expect(response.body).toBeDefined();
    });

    it('returns status 200 and books filtered by author', async () => {
      const response = await request(app)
        .get('/authors/Sample Author/books');

      expect(response.statusCode).toBe(200);
      expect(response.body).toBeDefined();
    });

    it('returns status 200 and books filtered by title', async () => {
      const response = await request(app)
        .get('/books/Sample Book 2');

      expect(response.statusCode).toBe(200);
      expect(response.body).toBeDefined();
    });
  });

  describe('When create a book', () => {
    it('returns status 201 if book is created', async () => {
      const response = await request(app)
        .post('/book')
        .send({ title: 'Book 2', author: 'Author 2', description: 'Description of book 2', price: 19.99, inventory: 50 });

      expect(response.statusCode).toBe(201);
      expect(response.body).toBeDefined();
    });
  });

  describe('When edit a book', () => {
    it('returns status 200 if book is edited', async () => {
      const response = await request(app)
        .put('/book/1')
        .send({ title: 'Book 1 edited', author: 'Author 1 edited', description: 'Description of book 1 edited', price: 19.99, inventory: 50 });

      expect(response.statusCode).toBe(200);
      expect(response.body).toBeDefined();
    });

    it('returns status 400 if book does not exist', async () => {
      const response = await request(app)
        .put('/book/100')
        .send({ title: 'Book 1 edited', author: 'Author 1 edited', description: 'Description of book 1 edited', price: 19.99, inventory: 50 });

      expect(response.statusCode).toBe(500);
      expect(response.body).toBeDefined();
    });
  });

  describe('When delete a book', () => {
    it('returns status 204 if book is deleted', async () => {
      const response = await request(app)
        .delete('/book/1');

      expect(response.statusCode).toBe(204);
    });

    it('returns status 400 if book does not exist', async () => {
      const response = await request(app)
        .delete('/book/100');

      expect(response.statusCode).toBe(500);
      expect(response.body).toBeDefined();
    });
  });
});
