import express from 'express';
import wrapWithErrorHandling from "../utils/wrapErrorHandling";
import GenreController from '../controller/film/GenreController';

const genreRouter = express.Router();
const genreController = new GenreController;

genreRouter.get('/', wrapWithErrorHandling(async (req, res) => {
    await genreController.getAllGenre(req, res);
}));

genreRouter.get('/:id', wrapWithErrorHandling(async (req, res) => {
    await genreController.getGenreById(req, res);
}));

export default genreRouter;