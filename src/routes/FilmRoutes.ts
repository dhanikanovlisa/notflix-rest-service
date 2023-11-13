import express from 'express';
import { FilmController } from "../controller/film/FilmController";
import wrapWithErrorHandling from "../utils/wrapErrorHandling";
import auth from '../middleware/Auth';
import SubmissionFilmController from '../controller/SOAP/SubmissionFilmController';

const filmRouter = express.Router();
const filmController = new FilmController();
const submissionFilmController = new SubmissionFilmController();


filmRouter.get('/premium-film', wrapWithErrorHandling(async (req, res) => {
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

filmRouter.delete('/delete/:id', wrapWithErrorHandling(async (req, res) => {
    await filmController.deleteFilm(req, res);
}));

filmRouter.put('/edit/:id', auth, wrapWithErrorHandling(async (req, res) => {
    await filmController.updateFilm(req, res);
}));

filmRouter.get('/requestFilm/:id', wrapWithErrorHandling(async (req, res) => {
    await submissionFilmController.getAllRequestFilmById(req, res);
}));

filmRouter.get('/requestFilm/detail/:id', wrapWithErrorHandling(async (req, res) => {
    await submissionFilmController.getRequestByRequestFilmId(req, res);
}));

filmRouter.post('/createFilmRequest', wrapWithErrorHandling(async (req, res) => {
    await submissionFilmController.createRequestFilm(req, res);
}));

filmRouter.delete('/requestFilm/delete/:id', wrapWithErrorHandling(async (req, res) => {
    await submissionFilmController.deleteRequestFilm(req, res);
}));









export default filmRouter;