import { Request, Response } from "express";
import axios from "axios";
import BaseSoapController from "./BaseSoapController";

class SubscriptionController extends BaseSoapController {
    private serviceUrl: string = `${process.env.SOAP_URL}/subscription`;

    public async getAllSubscription(req: Request, res: Response){
        await this.errorHandlingWrapper(async () => {
            const {responseStatus, message, data} = await this.dispatchSoapRequest(
                'getAllSubscription', 
                this.serviceUrl
            );
            
            res.status(responseStatus).json({message: message, data: data});
        }, req, res);
    }

    public async getSubscriptionByStatus(req: Request, res: Response){
        const {status} = req.params;

        await this.errorHandlingWrapper(async () => {
            const {responseStatus, message, data} = await this.dispatchSoapRequest(
                'getSubscriptionsByStatus',
                this.serviceUrl,
                {status: status.toUpperCase()}
            )
    
            res.status(responseStatus).json({message: message, data: data});
        }, req, res);
    }

    public async checkSubscriptionStatus(req: Request, res: Response){
        const {userId} = req.params;

        await this.errorHandlingWrapper(async () => {
            const {responseStatus, message, data} = await this.dispatchSoapRequest(
                'checkSubscriptionStatus',
                this.serviceUrl,
                {user_id: Number(userId)}
            );

            res.status(responseStatus).json({message: message, data: data});
        }, req, res);
    }

    public async request(req: Request, res: Response){
        try{
            
        }
        catch(error){

        }
    }

    public async acceptRequest(req: Request, res: Response){
        try{
            
        }
        catch(error){

        }
    }
    
    public async rejectRequest(req: Request, res: Response){
        try{
            
        }
        catch(error){

        }
    }
}

export default SubscriptionController;