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
                console.log(parsedResult);
                // const films = parsedResult['S:Envelope']['S:Body'][0]['ns2:getAllRequestFilmByIdResponse'][0]['return'];
                const films = await this.getResponse(parsedResult, 'getAllRequestFilmById');
                console.log(films);
                if (films && films.length > 0) {
                    const responseBody:any = [];
                    films.forEach((film:any) => {
                        const filmObject:any = {};
                        Object.keys(film).forEach((key) => {
                            filmObject[key] = film[key][0];
                        });
                        responseBody.push(filmObject);
                    });
                    console.log(responseBody);
                    res.status(200).json({message:"Success", data: responseBody});
                }
            }
        } catch (error){
            console.error('Error calling SOAP service:', error);
            res.status(500).send('Internal Server Error');
        }
    }

    async getRequestByRequestFilmId(req: Request, res:Response){
        const {id} = req.params;
        try {
            const header = await this.createHeader();
            const params = await this.createParams('requestFilm_id', id);
            const body = await this.createBody('getRequestFilmByFilmId', params);
            console.log(body);

            const response = await axios.post(`${process.env.SOAP_URL}/requestFilm`, body, {
                headers: header.headers
            });

            if (response.status === 200) {
                const parsedResult:any = await this.parseXmlResponse(response.data);
                // const films = parsedResult['S:Envelope']['S:Body'][0]['ns2:getRequestFilmByFilmIdResponse'][0]['return'];
                const films = await this.getResponse(parsedResult, 'getRequestFilmByFilmId');
                if(films && films.length > 0 ){
                    const responseBody: any = {}
                    const filmFormated = films[0];
                    Object.keys(filmFormated).forEach((key) => {
                        responseBody[key] = filmFormated[key][0];
                    
                    })
                    res.status(200).json({message:"Success", data: responseBody});
                }
            }
        } catch (error){
            console.error('Error calling SOAP service:', error);
            res.status(500).send('Internal Server Error');
        }
    }

    async createRequestFilm(req: Request, res:Response){
        const {id, title, description, film_path, film_poster, film_header, date_release, duration, film_path_size, film_poster_size, film_header_size} = req.body;

        try {
            if(film_path_size > 9 * 1024 * 1024 || film_poster_size > 800 * 1024 || film_header_size > 800 * 1024) {
                return res.status(400).json({ error: "File size too large" });
            }

            const header = await this.createHeader();
            const requestFilm: Record<string, any> = {
                'user_id': Number(id),
                'filmName': title,
                'description': description,
                'film_path': film_path,
                'film_poster': film_poster,
                'film_header': film_header,
                'date_release': date_release,
                'duration': Number(duration)
            };

            console.log(requestFilm);
            const params = await this.createManyParams(requestFilm);
            const body = await this.createBody('createRequestFilm', params);
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
            const params = await this.createParams('requestFilm_id', id);
            const body = await this.createBody('deleteRequestFilm', params);
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