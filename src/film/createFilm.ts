import { Request, Response } from 'express';
import prisma from '../prisma';

interface Genre {
    genre_id: number;
}

export const createFilm = async (req: Request, res: Response) => {
    try {
        const { title, description, film_path, film_poster, film_header, date_release, duration, username, genres } = req.body;

        const user = await prisma.user.findFirst({
            where: {
                username: username
            }
        });

        const parsedDate = new Date(date_release);

        const film = await prisma.film.create({
            data: {
                title,
                description,
                film_path,
                film_poster,
                film_header,
                date_release: parsedDate,
                duration,
                id_user: Number(user?.id_user)
            },
        });

        res.status(201).json({ message: 'Film created successfully', film});
    } catch (error) {
        console.error('Error creating film:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
