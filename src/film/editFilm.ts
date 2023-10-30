import { Response, Request } from "express";
import prisma from "../prisma";

export const editFilm = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { title, description, film_path, film_poster, film_header, date_release, duration, username, genres } = req.body;

        const user = await prisma.user.findFirst({
            where: {
                username: username,
            },
        });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const filmData: Record<string, any> = {};

        if (title) filmData.title = title;
        if (description) filmData.description = description;
        if (film_path) filmData.film_path = film_path;
        if (film_poster) filmData.film_poster = film_poster;
        if (film_header) filmData.film_header = film_header;
        if (date_release) filmData.date_release = date_release;
        if (duration) filmData.duration = duration;
        if (user?.id_user) filmData.id_user = user.id_user;

        const updatedFilm = await prisma.film.update({
            where: {
                film_id: parseInt(id),
            },
            data: filmData,
        });

        {/**    const filmGenres: number[] = genres || [];

    if (filmGenres.length > 0) {
      const updateFilmGenre = await prisma.film_genre.updateMany({
        where: {
          film_id: parseInt(id),
        },
        data: {
          genres: {
            set: filmGenres.map((genre: number) => ({
              genre_id: genre,
            })),
          },
        },
      });

    } else {
      console.log("Genres is empty. No update needed.");
    }
     */}

        const film = await prisma.film.findFirst({
            where: {
                film_id: parseInt(id),
            }
        })

        res.status(200).json({ message: "Film updated successfully", film });
    } catch (error) {
        console.error("Error editing film:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
