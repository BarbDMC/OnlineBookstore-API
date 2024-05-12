import { Validator } from 'jsonschema';
import { BookInterface } from '../interfaces/bookInterface';

const bookSchema = {
  type: 'object',
  properties: {
    title: { type: 'string', minLength: 1 },
    author: { type: 'string', minLength: 1 },
    description: { type: 'string', minLength: 1 },
    price: { type: 'number' },
    inventory: { type: 'number' },
    image: { type: 'string', required: false },
  },
  required: ['title', 'author', 'description', 'price', 'inventory'],
  additionalProperties: false
};

export const validateBook = (book: BookInterface) => {
  const validator = new Validator();
  const result = validator.validate(book, bookSchema);
  return result;
};
