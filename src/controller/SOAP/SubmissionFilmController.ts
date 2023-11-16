import { Request, Response } from "express";
import checkAndUpdateField from "../../utils/checkandUpdateField";
import axios from "axios";
import BaseSoapController from "./BaseSoapController";
import FilmModel from "../../models/FilmModel";

class SubmissionFilmController extends BaseSoapController {
    private filmModel: FilmModel = new FilmModel();
    private serviceUrl: string = `${process.env.SOAP_URL}/requestFilm`;
    async getAllRequestFilm(req:Request, res:Response){
        await this.errorHandlingWrapper(async () => {
            const {responseStatus, message, data} = await this.dispatchSoapRequest(
                'getAllRequestFilms', 
                this.serviceUrl
            );
            res.status(responseStatus).json({message: message, data: data});
        },req, res);
    }

    async getAllRequestFilmById(req:Request, res:Response){
        const {id} = req.params;
        await this.errorHandlingWrapper(async () => {
            const {responseStatus, message, data} = await this.dispatchSoapRequest(
                'getAllRequestFilmById', 
                this.serviceUrl,
                {user_id: Number(id)}
            );
            
            res.status(responseStatus).json({message: message, data: data});
        },req, res);
    }

    async getRequestByRequestFilmId(req: Request, res:Response){
        const {id} = req.params;
        await this.errorHandlingWrapper(async () => {
            const {responseStatus, message, data} = await this.dispatchSoapRequest(
                'getRequestFilmByFilmId', 
                this.serviceUrl,
                {requestFilm_id: Number(id)}
            );
            
            res.status(responseStatus).json({message: message, data: data});
            console.log(data);
        }, req, res);
    }
    
    async deleteRequestFilm(req: Request, res:Response){
        const {id} = req.params;
        await this.errorHandlingWrapper(async () => {
            const {responseStatus, message, data} = await this.dispatchSoapRequest(
                'deleteRequestFilm', 
                this.serviceUrl,
                {requestFilm_id: Number(id)}
            );
            
            res.status(responseStatus).json({message: message, data: data});
        }, req, res);
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

            const params = await this.createManyParams(requestFilm);
            const body = await this.createBody('createRequestFilm', params);

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
    
            const updatedTitle = checkAndUpdateField(title, responseBody.filmName) ?? "";
            const updatedDescription = checkAndUpdateField(description, responseBody.description) ?? "";
            const updatedFilmPath = checkAndUpdateField(film_path, responseBody.film_path) ?? "";
            const updatedFilmPoster = checkAndUpdateField(film_poster, responseBody.film_poster) ?? "";
            const updatedFilmHeader = checkAndUpdateField(film_header, responseBody.film_header) ?? "";
            const updatedDateRelease = checkAndUpdateField(date_release, responseBody.date_release);
            const updatedDuration =checkAndUpdateField(Number(duration),Number(responseBody.duration));
    
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
            console.log(bodyUpdate);
    
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
    
    async acceptRequestFilm(req: Request, res: Response){
        const {id} = req.params;
        let responseStatusCode;
        let messageData;
        let filmDetail:any;

        await this.errorHandlingWrapper(async () => {
            await this.dispatchSoapRequest(
                'acceptRequestFilm',
                this.serviceUrl,
                {requestFilm_id: Number(id)}
            );

            const {responseStatus, message, data} = await this.dispatchSoapRequest(
                'getRequestFilmByFilmId', 
                this.serviceUrl,
                {requestFilm_id: Number(id)}
            );
            responseStatusCode = responseStatus;
            messageData = message;
            filmDetail = data;
        }, req, res);

        if(responseStatusCode !== 200) return;
        const { filmName, description, film_path, film_poster, film_header, date_release, duration, user_id } = filmDetail;
        await this.filmModel.createFilm({
            title: filmName,
            description,
            film_path,
            film_poster,
            film_header,
            date_release: new Date(date_release),
            duration: Number(duration),
            id_user: Number(user_id)
        });

        res.status(200).json({message: messageData, data: filmDetail});
    }

    async rejectRequestFilm(req: Request, res: Response){
        const {id} = req.params;

        await this.errorHandlingWrapper(async () => {
            const {responseStatus, message, data} = await this.dispatchSoapRequest(
                'rejectRequestFilm',
                this.serviceUrl,
                {requestFilm_id: Number(id)}
            );

            res.status(responseStatus).json({message: message, data: data});
        }, req, res);
    }
    
}

export default SubmissionFilmController;