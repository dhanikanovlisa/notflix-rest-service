import express from 'express';
import CheckController from '../controller/check/CheckController';
import wrapWithErrorHandling from "../utils/wrapErrorHandling";
import auth from '../middleware/Auth';

const checkRouter = express.Router();
const  checkController = new CheckController();

checkRouter.get('/username/:username', wrapWithErrorHandling(async (req, res) => {
    await checkController.checkUsername(req, res);
}));

checkRouter.get('/email/:email', wrapWithErrorHandling(async (req, res) => {
    await checkController.checkEmail(req, res);
}));

checkRouter.get('/current-user',  wrapWithErrorHandling(async (req, res) => {
    await checkController.checkCurrentUser(req, res);
}));

checkRouter.get('/admin-email',  wrapWithErrorHandling(async (req, res) => {
    await checkController.getAdminEmail(req, res);
}));

export default checkRouter;