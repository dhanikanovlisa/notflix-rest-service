import express from 'express';
import filmRouter from './routes/FilmRoutes';
import profileRouter from './routes/ProfileRoute';
import authRouter from './routes/AuthRoutes';

var cors = require('cors');
const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors())

//Listen to port
app.listen(port, () => {
  console.log(`Server is askhjdhaskdjhs running on port ${port}`);
  console.log(`Database url ${process.env.DATABASE_URL}`)
});


//Routes
app.get('/', (_, res) => {
  res.send('Welcome To Notflix hi Rest Service');
});

/**Films */
app.use('/films', filmRouter);
/**Profile */
app.use('/profile', profileRouter);
/**Auth */
app.use('/auth', authRouter);