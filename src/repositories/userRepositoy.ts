import db from '../prisma/index';

export const findAllUsers = () => db.user.findMany();

export const findUserById = (id: number) => db.user.findUnique({ where: { idUser: id } });

export const findUniqueUser = (email: string) => db.user.findUnique({ where: { email } });