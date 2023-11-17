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

export default authRouter;