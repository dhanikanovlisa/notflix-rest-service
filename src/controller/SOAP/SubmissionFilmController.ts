import { Request, Response } from "express";
import axios from "axios";
import BaseSoapController from "./BaseSoapController";

class SubmissionFilmController extends BaseSoapController {

    async getAllRequestFilmById(req:Request, res:Response){
        const {id} = req.params;
        try {
            const header = await this.createHeader();
            const params = await this.createParams('user_id', id);
            const body = await this.createBody('getAllRequestFilmById', params);
            console.log(this.url + "/requestFilm");
            console.log(body);

            const response = await axios.post('http://127.0.0.1:3030/ws/requestFilm?wsdl', body, {
                headers: header.headers
            });

            const soapResponse = await response.data();
            
            res.status(200).send(soapResponse);
        } catch (error){
            console.error('Error calling SOAP service:', error);
            res.status(500).send('Internal Server Error');
        }
        
        
    }
}

export default SubmissionFilmController;