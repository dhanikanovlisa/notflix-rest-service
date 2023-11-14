import { Request, Response } from "express";
import axios from "axios";
import BaseSoapController from "./BaseSoapController";

class SubscriptionController extends BaseSoapController {
    public async getAllSubscription(req: Request, res: Response){
        try{
            const header = await this.createHeader();
            const body = await this.createBody('getAllSubscription', '');

            const response = await axios.post(`${process.env.SOAP_URL}/subscription`, body, {
                headers: header.headers
            });

            if (response.status === 200){
                const parsedResult = await this.parseXmlResponse(response.data);
                console.log(parsedResult);

                res.status(200).json({message:"Success"});
            }
        }
        catch(error){
            console.error('Error calling SOAP service:', error);
            res.status(500).send('Internal Server Error');
        }
    }

    public async getSubscriptionByStatus(req: Request, res: Response){
        try{
            
        }
        catch(error){

        }
    }

    public async checkSubscriptionStatus(req: Request, res: Response){
        try{
            
        }
        catch(error){

        }
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