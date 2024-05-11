
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.user.create({
    data: {
      idUser: 1,
      email: 'admin@example.com',
      name: 'Admin',
      surname: 'Admin',
      password: '$2a$12$68/zZLfnwN3Yxn.OvMO7YumW4mj/mrVfIkoO34MOrs39rVHVQRDV6',
      birthday: new Date('1990-01-01')
    },
  });

  
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });