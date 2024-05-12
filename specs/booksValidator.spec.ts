import { validateBook } from "../validators/booksValidator";
import { BookInterface } from "../interfaces/bookInterface";

describe('booksValidator', () => {
  describe('validateBook', () => {
    it('should return valid true and empty errors array when book is valid', () => {
      const book = {
        title: 'Valid title',
        author: 'Valid author',
        description: 'Valid description',
        price: 10.99,
        inventory: 100,
        image: 'valid-image-url.jpg',
      };

      const validationResult = validateBook(book);
      expect(validationResult.valid).toBe(true);
    });

    it('should return valid false and errors array with title, author, description, price, and inventory errors when book is invalid', () => {
      const book = {
        author: '',
        description: '',
        price: 'invalid-price',
        inventory: 'invalid-inventory',
      } as unknown as BookInterface;

      const validationResult = validateBook(book);
      expect(validationResult.valid).toBe(false);
      expect(validationResult.errors.length).toBe(5);
    });
  });
});
