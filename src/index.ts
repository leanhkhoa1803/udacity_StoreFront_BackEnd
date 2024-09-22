import express, { Application, Request, Response } from 'express';
import morgan from 'morgan';
import errorMiddleware from './middleware/error.middleware';
import configEnv from './configEnv';
import routes from './routes';

const PORT = configEnv.PORT || 3000;

const app: Application = express();
app.use(express.json());
app.use(morgan('common'));

app.use('/api', routes);
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
