import express from 'express';
import { FilmController } from "../controller/film/FilmController";
import wrapWithErrorHandling from "../utils/wrapErrorHandling";

const filmRouter = express.Router();
const filmController = new FilmController();

filmRouter.get('/', wrapWithErrorHandling(async (req, res) => {
    await filmController.getAllFilm(req, res);
}));

filmRouter.get('/user/:id', wrapWithErrorHandling(async (req, res) => {
    await filmController.getAllFilmByUserId(req, res);
}));

filmRouter.get('/film/:id', wrapWithErrorHandling(async (req, res) => {
    await filmController.getFilmByFilmId(req, res);
}));

filmRouter.post('/create/:id', wrapWithErrorHandling(async (req, res) => {
    await filmController.createFilm(req, res);
}));

filmRouter.delete('/delete/:film_id/user/:id', wrapWithErrorHandling(async (req, res) => {
    await filmController.deleteFilm(req, res);
}));

filmRouter.put('/edit/:id', wrapWithErrorHandling(async (req, res) => {
    await filmController.updateFilm(req, res);
}));







export default filmRouter;