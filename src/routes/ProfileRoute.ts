import express from 'express';
import auth from '../middleware/Auth';
import wrapWithErrorHandling from "../utils/wrapErrorHandling";
import ProfileController from '../controller/profile/ProfileController';

const profileRouter = express.Router();
const profileController = new ProfileController();

profileRouter.get('/:id', auth, wrapWithErrorHandling(async (req, res) => {
    await profileController.getProfileById(req, res);
}));


profileRouter.put('/edit/:id', auth, wrapWithErrorHandling(async (req, res) => {
    await profileController.updateProfile(req, res);
}));


export default profileRouter;