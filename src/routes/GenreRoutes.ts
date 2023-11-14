import express from 'express';
import auth from '../middleware/Auth';
import wrapWithErrorHandling from "../utils/wrapErrorHandling";
import GenreController from '../controller/film/GenreController';

const genreRouter = express.Router();
const genreController = new GenreController;

genreRouter.get('/', auth, wrapWithErrorHandling(async (req, res) => {
    await genreController.getAllGenre(req, res);
}));

genreRouter.get('/:id', auth, wrapWithErrorHandling(async (req, res) => {
    await genreController.getGenreById(req, res);
}));

export default genreRouter;