import express from 'express';
import loginRoutes from './routes/loginRoutes';
import booksRoutes from './routes/booksRoutes';
import cors from "cors";
import corsConfig from './config/cors';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors(corsConfig));
app.use(loginRoutes);
app.use(booksRoutes);
app.listen(port);

export default app;