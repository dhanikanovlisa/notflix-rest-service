import prisma from "../prisma/Prisma";
import { Film } from "../interface";

class FilmModel{

    /**Return all film for PHP Web App */
    async getAllFilm(){
        return prisma.film.findMany();
    }

    /**Return All Film By User Premium Id */
    async getAllFilmByUserId(id_user: number){
        return prisma.film.findMany({
            where: {id_user: id_user}
        })
    }

    /**Return Film by Film Id and User Id */
    async getFilmByFilmId(film_id: number, id_user: number) {
        return prisma.film.findUnique({
            where: {
                film_id: film_id,
                id_user: id_user,
            },
        });
    }

    /**Create New Film */
    async createFilm(film: Film){
        const createdFilm = await prisma.film.create({
            data: {
                title: film.title,
                description: film.description,
                film_path: film.film_path,
                film_poster: film.film_poster,
                film_header: film.film_header,
                date_release: film.date_release,
                duration: film.duration,
                id_user: film.id_user,
            },
        });

        return createdFilm;
    }

    /**Update Film */
    async updateFilm(film: Film){
        const updatedFilm = await prisma.film.update({
            where: {
                film_id: film.film_id,
            },
            data: film,
        });

        return updatedFilm;
    }

    /**Delete Film */
    async deleteFilm(film_id: number){
        await prisma.film.delete({
            where:{
                film_id: film_id
            }
        })
    }

}

export default FilmModel;