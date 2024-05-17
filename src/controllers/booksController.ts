import {
  getAllBooks, getBookById, getBooksByAuthor, getBooksByTitle, addBook, editBook, deleteBookItem,
} from '../services/booksServices';

import { Request,Response } from 'express';
import { validateBook } from '../validators/booksValidator';

export const bookGetAll = async (req: Request, res: Response) => {
  try {
    const books = await getAllBooks();
    res.json(books);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const bookGetById = async (req: Request, res: Response) => {
  try {
    const bookId = parseInt(req.params.bookId, 10);
    const book = await getBookById(bookId);

    if (!book) {
      return res.status(404).json({ message: 'Book not found.' });
    }

    res.json(book);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const bookListByAuthor = async (req: Request, res: Response) => {
  try {
    const books = await getBooksByAuthor(req.params.author);
    res.json(books);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const bookListByTitle = async (req: Request, res: Response) => {
  try {
    const books = await getBooksByTitle(req.params.title);
    res.json(books);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const bookCreate = async (req: Request, res: Response) => {
  try {
    const validationResult = validateBook(req.body);

    if (!validationResult.valid) {
      return res.status(400).json({ errors: validationResult.errors });
    }

    const book = await addBook(req.body);
    res.status(201).json({ message: 'Book Created.', book });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const bookEdit = async (req: Request, res: Response) => {
  try {
    const validationResult = validateBook(req.body);

    if (!validationResult.valid) {
      return res.status(400).json({ errors: validationResult.errors });
    }

    const bookId = parseInt(req.params.bookId, 10);
    const book = await editBook(bookId, req.body);
    res.json({ message: 'Book Updated.', book });
    
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const bookDelete = async (req: Request, res: Response) => {
  try {
    const bookId = parseInt(req.params.bookId, 10);
    await deleteBookItem(bookId);

    res.status(204).send();
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};
