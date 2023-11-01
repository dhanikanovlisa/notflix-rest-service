import express from 'express';
import { createFilm, deleteFilm, getFilmById, editFilm, getAllFilm } from './film';
import { editProfile, getProfileById } from './profile';
import { checkUsername } from './user';

var cors = require('cors');
const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors())

//Listen to port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`Database url ${process.env.DATABASE_URL}`)
});


//Routes
app.get('/', (_, res) => {
  res.send('Welcome To Notflix Rest Service');


});
app.get('/films', getAllFilm);
app.post('/create/film', createFilm);
app.delete('/delete/film/:id', deleteFilm);
app.get('/get/film/:id', getFilmById);
app.put('/edit/film/:id', editFilm);

app.get('/get/user/:id', getProfileById);
app.put('/edit/user/:id', editProfile);

app.get('/check/username/:username', checkUsername);