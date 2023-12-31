import express from 'express';
import { FilmController } from "../controller/film/FilmController";
import wrapWithErrorHandling from "../utils/wrapErrorHandling";
import auth from '../middleware/Auth';
import SubmissionFilmController from '../controller/SOAP/SubmissionFilmController';

const filmRouter = express.Router();
const filmController = new FilmController();
const submissionFilmController = new SubmissionFilmController();

filmRouter.get('/count', wrapWithErrorHandling(async (req, res) => {
    await filmController.getFilmCount(req, res);
}));

filmRouter.get('/premium-film/:offset', wrapWithErrorHandling(async (req, res) => {
    await filmController.getAllFilm(req, res);
}));

filmRouter.get('/user/:id', auth, wrapWithErrorHandling(async (req, res) => {
    await filmController.getAllFilmByUserId(req, res);
}));

filmRouter.get('/film/:filmId/user/:userId', auth, wrapWithErrorHandling(async (req, res) => {
    await filmController.getFilmByFilmId(req, res);
}));

filmRouter.get('/film/film/:id', wrapWithErrorHandling(async (req, res) => {
    await filmController.getFilmById(req, res);
}));

filmRouter.post('/create/:id', auth, wrapWithErrorHandling(async (req, res) => {
    await filmController.createFilm(req, res);
}));

filmRouter.delete('/film/delete/:id', auth, wrapWithErrorHandling(async (req, res) => {
    await filmController.deleteFilm(req, res);
}));

filmRouter.put('/film/edit/:id', auth, wrapWithErrorHandling(async (req, res) => {
    await filmController.updateFilm(req, res);
}));

filmRouter.get('/requestFilm', auth, wrapWithErrorHandling(async (req, res) => {
    await submissionFilmController.getAllRequestFilm(req, res);
}));

filmRouter.get('/requestFilm/status/:status', auth, wrapWithErrorHandling(async (req, res) => {
    await submissionFilmController.getAllRequestFilmByStatus(req, res);
}));

filmRouter.get('/requestFilm/:id', auth, wrapWithErrorHandling(async (req, res) => {
    await submissionFilmController.getAllRequestFilmById(req, res);
}));

filmRouter.get('/requestFilm/detail/:id', auth,  wrapWithErrorHandling(async (req, res) => {
    await submissionFilmController.getRequestByRequestFilmId(req, res);
}));

filmRouter.post('/requestFilm/create',auth, wrapWithErrorHandling(async (req, res) => {
    await submissionFilmController.createRequestFilm(req, res);
}));

filmRouter.put('/requestFilm/edit/:id', auth,  wrapWithErrorHandling(async (req, res) => {
    await submissionFilmController.updateRequestFilm(req, res); 
}));

filmRouter.delete('/requestFilm/delete/:id', auth, wrapWithErrorHandling(async (req, res) => {
    await submissionFilmController.deleteRequestFilm(req, res);
}));

filmRouter.put('/requestFilm/accept/:id', auth, wrapWithErrorHandling(async (req, res) => {
    await submissionFilmController.acceptRequestFilm(req, res);
}));

filmRouter.put('/requestFilm/reject/:id', auth, wrapWithErrorHandling(async (req, res) => {
    await submissionFilmController.rejectRequestFilm(req, res);
}));
export default filmRouter;