import { user } from './fixtures/users';
import { checkUser } from '../services/loginServices';
import { prismaTestContext } from './context/prismaContext';

describe('Login Services', () => {
  beforeAll(async () => {
    const db = await prismaTestContext().before();
    await db.user.create({data: user});
  });

  afterAll(async () => {
    await prismaTestContext().after();
  });

  describe('When checkUser', () => {
    it('returns an user if find one', async () => {
      const checkedUser = await checkUser('user@example.com');
      expect(checkedUser.email).toBe('user@example.com');
    });

    it('returns null if the user is not found', async () => {
      const checkedUser = await checkUser('otherexample@email.com');
      expect(checkedUser).toBe(null);
    });
  });
});