import { Router } from 'express';
import loginRoutes from './routes/loginRoutes';

const apiRouter = Router();

apiRouter.use(loginRoutes);

export default apiRouter;