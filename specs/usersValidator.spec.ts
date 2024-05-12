
import validateUserLogin from '../validators/usersValidator';
import { UserLoginInterface } from '../interfaces/userInterfaces';

describe('validateUserLogin', () => {
  const user = {
    email: 'test@example.com',
    password: 'strongpassword',
  };

  it('returns true if the user object is correct', () => {
    const result = validateUserLogin(user);
    expect(result.valid).toBe(true);
  });

  it('returns false if the user object has missing fields', () => {
    const wrongUser = {
      password: 'strongpassword',
    } as UserLoginInterface;

    const result = validateUserLogin(wrongUser);
    expect(result.valid).toBe(false);
  });

});
