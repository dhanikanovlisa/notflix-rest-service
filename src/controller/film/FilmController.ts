
import { Request, Response } from 'express';
import { Film } from '../../interface';
import UserModel from '../../models/UserModel';
import FilmModel from '../../models/FilmModel';
import FilmGenreModel from '../../models/FilmGenreModel';
import GenreModel from '../../models/GenreModel';
import checkAndUpdateField from '../../utils/checkandUpdateField';
class FilmController {

    private filmModel: FilmModel;
    private userModel: UserModel;
    private filmGenreModel: FilmGenreModel;
    private genreModel: GenreModel;

    constructor() {
        this.filmModel = new FilmModel();
        this.userModel = new UserModel();
        this.filmGenreModel = new FilmGenreModel();
        this.genreModel = new GenreModel();
    }

    async getAllFilm(req: Request, res: Response) {
        try {
            const allFilm = await this.filmModel.getAllFilm();
            res.status(200).json({ message: 'All film', data: allFilm });
        } catch (error) {
            console.error('Error getting film:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    async getAllFilmByUserId(req: Request, res: Response) {

        try {
            const { id } = req.params;
            const allFilmByUser = await this.filmModel.getAllFilmByUserId(Number(id))
            res.status(200).json({ message: 'Succes', data: allFilmByUser })

        } catch (error) {
            console.error('Error getting film:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    async getFilmByFilmId(req: Request, res: Response) {
        try {
            const { userId, filmId } = req.params;
            const film = await this.filmModel.getFilmByFilmId(Number(filmId))
            if (!film) {
                res.status(404).json({ message: "Film Not Found" });
            } else {
                if(film.id_user === Number(userId)){
                    const filmGenre = await this.filmGenreModel.getFilmGenreByFilmId(Number(filmId));
                const genrePromises = filmGenre.map(async (genre:any) => {
                    const genreInfo = await this.genreModel.getGenreById(genre.genre_id);
                    return genreInfo?.genre_name || '';
                });

                const genres = await Promise.all(genrePromises);

                res.status(200).json({ message: 'Success', data: film, genre: genres });
                } else {
                    res.status(401).json({ message: "Unauthorized Access" })
                }
            }
        } catch (error) {
            console.error('Error getting film:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    async createFilm(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { title, description, film_path, film_poster, film_header, date_release, duration, genres } = req.body;
            const user = await this.userModel.getUserById(Number(id));
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            const createFilm = await this.filmModel.createFilm({
                title,
                description,
                film_path,
                film_poster,
                film_header,
                date_release: new Date(date_release),
                duration: Number(duration),
                id_user: user.id_user
            });

            const filmId = createFilm.film_id;
            const addGenres = await this.filmGenreModel.addFilmGenre(Number(filmId), genres);


            res.status(201).json({ message: "Created", film: createFilm, genre: addGenres })

        } catch (error) {
            console.error('Error getting film:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    async updateFilm(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { title, description, film_path, film_poster, film_header, film_path_size, film_poster_size, film_header_size, date_release, duration, id_user, genres } = req.body;

            const user = await this.userModel.getUserById(Number(id_user));
            if (!user) {
                return res.status(401).json({ error: "Unauthorized access" });
            }

            const filmData = await this.filmModel.getFilmByFilmId(Number(id));

            if (!filmData) {
                return res.status(404).json({ error: "Film not found" });
            }

            if(film_path_size > 9 * 1024 * 1024 || film_poster_size > 800 * 1024 || film_header_size > 800 * 1024) {
                return res.status(400).json({ error: "File size too large" });
            }

            const updatedTitle = checkAndUpdateField(title, filmData.title) ?? "";
            const updatedDescription = checkAndUpdateField(description, filmData.description) ?? "";
            const updatedFilmPath =checkAndUpdateField(film_path, filmData.film_path) ?? "";
            const updatedFilmPoster = checkAndUpdateField(film_poster, filmData.film_poster) ?? "";
            const updatedFilmHeader = checkAndUpdateField(film_header, filmData.film_header) ?? "";
            const updatedDateRelease = checkAndUpdateField(date_release, filmData.date_release);
            const updatedDuration = checkAndUpdateField(Number(duration), Number(filmData.duration));

            const updated: Film = {
                film_id: Number(id),
                title: updatedTitle?.toString(),
                description: updatedDescription?.toString(),
                film_path: updatedFilmPath?.toString(),
                film_poster: updatedFilmPoster?.toString(),
                film_header: updatedFilmHeader?.toString(),
                date_release: updatedDateRelease as Date,
                duration: Number(updatedDuration),
                id_user: id_user
            }

            if (genres && genres.length > 0) {
                await this.filmGenreModel.deleteFilmGenre(Number(id));
                await this.filmGenreModel.addFilmGenre(Number(id), genres);
            }

            this.filmModel.updateFilm(updated);
            res.status(200).json({ message: "Film updated successfully" });
        } catch (error) {
            console.error('Error getting film:', error);
            res.status(500).json({ error: 'Internal server error' });
        }

    }

    async deleteFilm(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const checkFilm = await this.filmModel.getFilmByFilmId(Number(id));
            if (!checkFilm) {
                res.status(404).json({ message: "Film Not Found" });
            } else {
                this.filmGenreModel.deleteFilmGenre(Number(id));
                this.filmModel.deleteFilm(Number(id));
                res.status(200).json({ message: 'Film deleted successfully' });
            }

        } catch (error) {
            console.error('Error getting film:', error);
            res.status(500).json({ error: 'Internal server error' });
        }

    }

}

export { FilmController }