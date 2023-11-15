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
                const films = parsedResult['S:Envelope']['S:Body'][0]['ns2:getAllRequestFilmByIdResponse'][0]['return'];
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
                const films = parsedResult['S:Envelope']['S:Body'][0]['ns2:getRequestFilmByFilmIdResponse'][0]['return'];
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

    async updateRequestFilm(req: Request, res: Response) {
        const { id } = req.params;
        const { user_id, title, description, film_path, film_poster, film_header, date_release, duration, film_path_size, film_poster_size, film_header_size } = req.body;
    
        try {
            const header = await this.createHeader();
            const params = await this.createParams('requestFilm_id', id);
            const body = await this.createBody('getRequestFilmByFilmId', params);

            const response = await axios.post(`${process.env.SOAP_URL}/requestFilm`, body, {
                headers: header.headers
            });

            const responseBody: any = {}
            if (response.status === 200) {
                const parsedResult:any = await this.parseXmlResponse(response.data);
                const films = parsedResult['S:Envelope']['S:Body'][0]['ns2:getRequestFilmByFilmIdResponse'][0]['return'];
                if(films && films.length > 0 ){
                    const filmFormated = films[0];
                    Object.keys(filmFormated).forEach((key) => {
                        responseBody[key] = filmFormated[key][0];
                    
                    })
                }
            }
            console.log("hasil fetch check" , responseBody);
    
            if (film_path_size > 9 * 1024 * 1024 || film_poster_size > 800 * 1024 || film_header_size > 800 * 1024) {
                return res.status(400).json({ error: "File size too large" });
            }
    
            const updatedTitle = this.checkAndUpdateField(title, responseBody.filmName) ?? "";
            const updatedDescription = this.checkAndUpdateField(description, responseBody.description) ?? "";
            const updatedFilmPath = this.checkAndUpdateField(film_path, responseBody.film_path) ?? "";
            const updatedFilmPoster = this.checkAndUpdateField(film_poster, responseBody.film_poster) ?? "";
            const updatedFilmHeader = this.checkAndUpdateField(film_header, responseBody.film_header) ?? "";
            const updatedDateRelease = this.checkAndUpdateField(date_release, responseBody.date_release);
            const updatedDuration = this.checkAndUpdateField(Number(duration),Number(responseBody.duration));
    
            const requestFilm: Record<string, any> = {
                'requestFilm_id': Number(id),
                'user_id': Number(user_id),
                'filmName': updatedTitle,
                'description': updatedDescription,
                'film_path': updatedFilmPath,
                'film_poster': updatedFilmPoster,
                'film_header': updatedFilmHeader,
                'date_release': updatedDateRelease,
                'duration': Number(updatedDuration)
            };
    
            console.log("hasil update", requestFilm);
            const paramsUpdate = await this.createManyParams(requestFilm);
            const bodyUpdate = await this.createBody('editRequestFilm', paramsUpdate);
            const responseUpdate = await axios.post(`${process.env.SOAP_URL}/requestFilm`, bodyUpdate, {
                headers: header.headers
            });
    
            if (responseUpdate.status === 200) {
                const parsedResult: any = await this.parseXmlResponse(responseUpdate.data);
                const responseBody = parsedResult['S:Envelope']['S:Body'];
                return res.status(200).json(responseBody);
            }
    
        } catch (error) {
            console.error('Error calling SOAP service:', error);
            return res.status(500).send('Internal Server Error');
        }
    }
    

    checkAndUpdateField(newData: string | number | Date | undefined, existingData: string | number | Date) {
        if (newData === undefined || newData === null || newData === "") {
            return existingData;
        } else {
            if (typeof newData === "string") {
                if(newData === ""){
                    return existingData;
                }
                if (newData !== existingData) {
                    return newData;
                } else if(newData === existingData) {
                    return existingData;
                }
            } else if (newData instanceof Date) {
                if (newData.getDate() !== (existingData as Date).getDate()) {
                    return newData;
                } else {
                    return existingData;
                }
            } else if (typeof newData === "number"){
                if(newData === 0){
                    return existingData;
                } else if(newData !== existingData){
                    return newData;
                }
            }
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