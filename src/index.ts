'use strict'
import express from 'express';
import filmRouter from './routes/FilmRoutes';
import profileRouter from './routes/ProfileRoute';
import authRouter from './routes/AuthRoutes';
import genreRouter from './routes/GenreRoutes';
import subscriptionsRouter from './routes/SubscriptionsRoutes';

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
  res.send('Welcome To Notflix qwer Service');
});

/**Films */
app.use('/films', filmRouter);
/**Genres */
app.use('/genres', genreRouter);
/**Profile */
app.use('/profile', profileRouter);
/**Subscriptions */
app.use('/subscriptions', subscriptionsRouter);
/**Auth */
app.use('/auth', authRouter);
/**Check */
app.use('/check', checkRouter);