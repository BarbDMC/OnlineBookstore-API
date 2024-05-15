import { Request, Response } from 'express';
import validateUserLogin from '../validators/usersValidator';
import { checkUser, checkPassword, generateToken } from '../services/loginServices';

const userLogin = async (req: Request, res: Response) => {
  const validationResult = validateUserLogin(req.body);

  if (!validationResult.valid) {
    return res.status(400).json({ errors: validationResult.errors });
  }

  const { email, password } = req.body;
  const user = await checkUser(email);

  if (!user) {
    return res.status(404).send('User not found');
  }

  const isPasswordValid = await checkPassword(password, user.password);

  if (!isPasswordValid) {
    return res.status(400).send('Wrong user or password');
  }

  const payload = { id: user.idUser, email: user.email };
  const token = generateToken(payload);

  return res.status(200).json(
    {
      message: 'Login successful',
      token,
      user: {
        id: user.idUser,
        name: user.name,
        middleName: user.middleName,
        surname: user.surname,
        secondSurname: user.secondSurname,
        email: user.email,
        birthday: user.birthday,
        role: user.role
      },
    },
  );
};

export default userLogin;