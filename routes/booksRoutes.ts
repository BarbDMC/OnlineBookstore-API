import { Router } from 'express';
import {
  bookGetAll, bookGetById, bookListByAuthor, bookListByTitle, bookCreate, bookEdit, bookDelete,
} from '../controllers/booksController';

const booksRoutes = Router();
booksRoutes.get('/books', bookGetAll);
booksRoutes.get('/book/:bookId', bookGetById);
booksRoutes.get('/authors/:author/books', bookListByAuthor);
booksRoutes.get('/books/:title', bookListByTitle);
booksRoutes.post('/book', bookCreate);
booksRoutes.put('/book/:bookId', bookEdit);
booksRoutes.delete('/book/:bookId', bookDelete);

export default booksRoutes;
