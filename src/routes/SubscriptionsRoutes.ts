import express from 'express';
import wrapWithErrorHandling from "../utils/wrapErrorHandling";
import SubscriptionController from '../controller/SOAP/SubscriptionController'; 
import auth from '../middleware/Auth';

const subscriptionsRouter = express.Router();
const subscriptionContorller = new SubscriptionController();

subscriptionsRouter.get('/', auth, wrapWithErrorHandling(async (req, res) => {
    await subscriptionContorller.getAllSubscription(req, res);
}))

subscriptionsRouter.get('/:status', auth, wrapWithErrorHandling(async (req, res) => {
    await subscriptionContorller.getSubscriptionByStatus(req, res);
}))

subscriptionsRouter.get('/:userId', auth, wrapWithErrorHandling(async (req, res) => {
    await subscriptionContorller.checkSubscriptionStatus(req, res);
}))

subscriptionsRouter.post('/request/:userId', auth, wrapWithErrorHandling(async (req, res) => {
    await subscriptionContorller.request(req, res);
}))

subscriptionsRouter.put('/accept/:userId', auth, wrapWithErrorHandling(async (req, res) => {
    await subscriptionContorller.acceptRequest(req, res);
}))

subscriptionsRouter.put('/reject/:userId', auth, wrapWithErrorHandling(async (req, res) => {
    await subscriptionContorller.rejectRequest(req, res);
}))

export default subscriptionsRouter;