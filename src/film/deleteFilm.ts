import { Request, Response } from 'express';
import prisma from '../prisma';

export const deleteFilm = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const check = await prisma.film.findFirst({
            where:{
                film_id : Number(id)
            }
        });

        /**Check if movie exist */

        if(check === null){
            res.status(404).json({ error: 'Film not found' });
            return;
        }

        const filmGenre = await prisma.film_genre.deleteMany({
            where: {
                film_id: Number(id),
            },
        });

        const film = await prisma.film.delete({
            where: {
                film_id: Number(id),
            },
        });

        res.status(200).json({ message: 'Film deleted successfully', film, filmGenre });
    } catch (error) {
        console.error('Error deleting film:', error);

        res.status(500).json({ error: 'Internal server error' });
    }
};
