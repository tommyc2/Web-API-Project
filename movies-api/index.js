// Main entry point for application //

import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import './db';
import defaultErrHandler from './errHandler'
import moviesRouter from './api/movies';   // import movies router

dotenv.config();

const app = express();
const port = process.env.PORT; 

app.use(cors());
app.use(express.json());
app.use('/api/movies', moviesRouter);
app.use(defaultErrHandler);

app.listen(port, () => {
  console.info(`Server running at ${port}`);
});