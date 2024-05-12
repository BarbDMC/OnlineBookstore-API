import db from '../prisma/index';
import { user, user2 } from './fixtures/users';
import { prismaTestContext } from './context/prismaContext';
import { findAllUsers, findUserById, findUniqueUser } from '../repositories/userRepositoy';

describe('User Repository', () => {
  beforeEach(async () => {
    const db = await prismaTestContext().before();
    await db.user.createMany({data: [user, user2]});
  });

  afterEach(async () => {
    await prismaTestContext().after();
  });

  describe('findAllUsers', () => {
    it('should return all users', async () => {
      const users = await findAllUsers();
      expect(users.length).toBe(2);
    });
  });

  describe('findUserById', () => {
    it('should return a user by id', async () => {
      const foundUser = await findUserById(1);
      expect(foundUser.idUser).toBe(1);
      expect(foundUser.email).toBe('user@example.com');
    });

    it('should return null if user is not found', async () => {
      const foundUser = await findUserById(100);
      expect(foundUser).toBe(null);
    });
  });

  describe('findUniqueUser', () => {
    it('should return a user by email', async () => {
      const foundUser = await findUniqueUser('user2@example.com');
      expect(foundUser.idUser).toBe(2);
    });

    it('should return null if user is not found', async () => {
      const foundUser = await findUniqueUser('noexisting@email.com');
      expect(foundUser).toBe(null);
    });
  });
});