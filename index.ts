import express from 'express';
import prisma from './src/prisma';
import seed from './seed';

const app = express();
const port = process.env.PORT;

//Listen to port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`Database url ${process.env.DATABASE_URL}`)
});

//Routes
app.get('/', (_, res) => {
  res.send(', World!');
});