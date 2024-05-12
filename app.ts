import express from 'express';
import loginRoutes from './routes/loginRoutes';
import booksRoutes from './routes/booksRoutes';

const app = express();
const port = 3000;

app.use(express.json());
app.use(loginRoutes);
app.use(booksRoutes);
app.listen(port);

export default app;