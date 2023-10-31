import { Request, Response } from 'express';
import prisma from "../prisma";
export const getAllFilm = async(req:Request, res:Response) => {
    try{
        const allFilm = await prisma.film.findMany();
        res.status(200).json({ message: 'All film', data: allFilm });
    } catch (error){
        console.error('Error getting film:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export const getFilmById = async (req: Request, res: Response) => {

    try{
        const {id} = req.params;
        const film = await prisma.film.findFirst({
            where: {
                film_id: Number(id)
            }
        })

        const filmGenre = await prisma.film_genre.findMany({
            where:{
                film_id: Number(id)
            }
        })

        if(film === null){
            res.status(404).json({ error: 'Film not found' });
        } else {
            res.status(200).json({ message: 'Film found', datafilm: film, datagenre: filmGenre });
        }

    } catch (error){
        console.error('Error getting film:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
