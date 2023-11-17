
import { Request, Response } from 'express';
import GenreModel from '../../models/GenreModel';

class GenreController{
    private genreModel: GenreModel;

    constructor(){
        this.genreModel = new GenreModel();
    }

    async getAllGenre(req: Request, res: Response){
        try {
            const allGenre = await this.genreModel.getAllGenre();
            res.status(200).json({ message: 'All genre', data: allGenre });
        } catch (error) {
            console.error('Error getting genre:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    async getGenreById(req: Request, res: Response){
        try {
            const { id } = req.params;
            const genre = await this.genreModel.getGenreById(Number(id));
            if(!genre){
                res.status(404).json({message: "Genre Not Found"});
            } else {
                res.status(200).json({ message: 'Succes', data: genre });
            }
        } catch (error) {
            console.error('Error getting genre:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

}

export default GenreController;