import express from 'express';
import cors from 'cors';

import notesRouter from './routes/notes';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/notes', notesRouter);

export default app;
