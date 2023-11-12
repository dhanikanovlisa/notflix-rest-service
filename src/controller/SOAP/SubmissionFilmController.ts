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
            console.log(body);

            const response = await axios.post(`${process.env.SOAP_URL}/requestFilm`, body, {
                headers: header.headers
            });

            if (response.status === 200) {
                const parsedResult:any = await this.parseXmlResponse(response.data);
                const responseBody = parsedResult['S:Envelope']['S:Body'][0]['ns2:getAllRequestFilmByIdResponse'][0]['return'][0];;
                res.status(200).json(responseBody);
            }
        } catch (error){
            console.error('Error calling SOAP service:', error);
            res.status(500).send('Internal Server Error');
        }
    }

    async createRequestFilm(req: Request, res:Response){
        const {id, title, description, film_path, film_poster, film_header, date_release, duration} = req.body;

        try {
            const header = await this.createHeader();
            const requestFilm: Record<string, any> = {
                'user_id': Number(id),
                'title': title,
                'description': description,
                'film_path': film_path,
                'film_poster': film_poster,
                'film_header': film_header,
                'date_release': new Date(date_release),
                'duration': Number(duration)
            };
            const params = await this.createManyParams(requestFilm);
            const body = await this.createBody('getAllRequestFilmById', params);
            console.log(body);

            const response = await axios.post(`${process.env.SOAP_URL}/requestFilm`, body, {
                headers: header.headers
            });

            if (response.status === 200) {
                const parsedResult:any = await this.parseXmlResponse(response.data);
                const responseBody = parsedResult['S:Envelope']['S:Body'];
                res.status(200).json(responseBody);
            }

        } catch (error){
            console.error('Error calling SOAP service:', error);
            res.status(500).send('Internal Server Error');
        }
    }

    async deleteRequestFilm(req: Request, res:Response){
        const {id} = req.params;
        try {
            const header = await this.createHeader();
            const params = await this.createParams('user_id', id);
            const body = await this.createBody('getAllRequestFilmById', params);
            console.log(body);

            const response = await axios.post(`${process.env.SOAP_URL}/requestFilm`, body, {
                headers: header.headers
            });

            if (response.status === 200) {
                const parsedResult:any = await this.parseXmlResponse(response.data);
                const responseBody = parsedResult['S:Envelope']['S:Body'];
                res.status(200).json(responseBody);
            }
        }catch (error){
            console.error('Error calling SOAP service:', error);
            res.status(500).send('Internal Server Error');
        }
    }

}

export default SubmissionFilmController;