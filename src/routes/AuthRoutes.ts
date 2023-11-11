import express from 'express';
import AuthController from '../controller/auth/AuthController';
import wrapWithErrorHandling from "../utils/wrapErrorHandling";
import auth from '../middleware/Auth';

const authRouter = express.Router();
const authController = new AuthController();

authRouter.post('/login', wrapWithErrorHandling(async (req, res) => {
    await authController.login(req, res);
}));

authRouter.post('/register', wrapWithErrorHandling(async (req, res) => {
    await authController.register(req, res);
}));

authRouter.get('/username/:username', wrapWithErrorHandling(async (req, res) => {
    await authController.checkUsername(req, res);
}));

authRouter.get('/email/:email', wrapWithErrorHandling(async (req, res) => {
    await authController.checkEmail(req, res);
}));

authRouter.get('/current-user',  wrapWithErrorHandling(async (req, res) => {
    await authController.checkCurrentUser(req, res);
}));

export default authRouter;