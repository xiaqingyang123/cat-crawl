console.log('index.js loaded')
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import rewriteRouter from './routes/rewrite.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/rewrite', rewriteRouter);

app.get('/', (_, res) => res.send('🐾 Cat-Scraper backend running'));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Backend listening on :${PORT}`));