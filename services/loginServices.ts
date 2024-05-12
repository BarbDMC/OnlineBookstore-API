import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { findUniqueUser } from '../repositories/userRepositoy';

export const checkPassword = (password: string, hashedPassword: string) => bcrypt.compare(password, hashedPassword);

export const checkUser = (email: string) => findUniqueUser(email);

export const generateToken = (data: {id: number, email:string}) => jwt.sign(data, process.env.JWT_SECRET_KEY as string, { expiresIn: '1h' });
