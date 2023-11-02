
import { Request, Response } from 'express';
import UserModel from '../../models/UserModel';
import FilmModel from '../../models/FilmModel';
import FilmGenreModel from '../../models/FilmGenreModel';

class FilmController {

    private filmModel: FilmModel;
    private userModel: UserModel;
    private filmGenreModel: FilmGenreModel;

    constructor() {
        this.filmModel = new FilmModel();
        this.userModel = new UserModel();
        this.filmGenreModel = new FilmGenreModel();
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
            const { id, film_id } = req.params;
            const film = await this.filmModel.getFilmByFilmId(Number(film_id), Number(id))
            res.status(200).json({ message: 'Succes', data: film });
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
        // try {
        //     const { id } = req.params;
        //     const { title, description, film_path, film_poster, film_header, date_release, duration, user_id, genres } = req.body;

        //     const user = await this.userModel.getUserById(Number(user_id));
        //     if (!user) {
        //         return res.status(404).json({ error: "Make sure this user has this film" });
        //     }

        //     const filmData: Film = {};

        //     if (title) filmData.title = title;
        //     if (description) filmData.description = description;
        //     if (film_path) filmData.film_path = film_path;
        //     if (film_poster) filmData.film_poster = film_poster;
        //     if (film_header) filmData.film_header = film_header;
        //     if (date_release) filmData.date_release = date_release;
        //     if (duration) filmData.duration = duration;
        //     if (user?.id_user) filmData.id_user = user.id_user;
        //     filmData.film_id = Number(id);

        //     const updatedFilm = this.filmModel.updateFilm(filmData);
        //     res.status(200).json({ message: "Film updated successfully", film });
        // } catch (error) {
        //     console.error('Error getting film:', error);
        //     res.status(500).json({ error: 'Internal server error' });
        // }

    }

    async deleteFilm(req: Request, res: Response) {
        try {
            const { film_id,id } = req.params;
            const checkUser = await this.filmModel.getFilmByFilmId(Number(film_id), Number(id));

            if (!checkUser) {
                return res.status(404).json({ message: 'Double check the user id and film id' });
            }

            this.filmGenreModel.deleteFilmGenre(Number(id));
            this.filmModel.deleteFilm(Number(id));
            res.status(200).json({ message: 'Film deleted successfully' });
        } catch (error) {
            console.error('Error getting film:', error);
            res.status(500).json({ error: 'Internal server error' });
        }

    }

}

export { FilmController }