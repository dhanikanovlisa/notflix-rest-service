import express from 'express';
import prisma from './src/prisma';
import seed from './seed';
import { createFilm } from './src/film';
import { deleteFilm } from './src/film/deleteFilm';
import { getFilmById } from './src/film/getFilm';

const app = express();
const port = process.env.PORT;

//Listen to port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`Database url ${process.env.DATABASE_URL}`)
});

app.use(express.json());

//Routes
app.get('/', (_, res) => {
  res.send('Welcome To Notflix Rest Service');
{/*  seed();
  seed().then(() => {
    console.log("Seed Completed");
  })*/}
});

app.post('/create/film', createFilm);
app.delete('/delete/film/:id', deleteFilm);
app.get('/get/film/:id', getFilmById);