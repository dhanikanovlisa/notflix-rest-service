import { Request, Response } from 'express';
import prisma from '../prisma';

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

        const filmId = film.film_id;

        const filmGenre = await prisma.film_genre.createMany({
            data: genres.map((genre: number) => ({
                film_id: filmId,
                genre_id: genre,
            })),
        });

        res.status(201).json({ message: 'Film created successfully', film, filmGenre });
    } catch (error) {
        console.error('Error creating film:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
