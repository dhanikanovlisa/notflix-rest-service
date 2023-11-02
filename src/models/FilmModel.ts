import prisma from "../prisma/Prisma";
import { Film } from "../interface";

class FilmModel{
    async getAllFilm(){
        return prisma.film.findMany();
    }

    async getAllFilmByUserId(id_user: number){
        return prisma.film.findMany({
            where: {id_user: id_user}
        })
    }

    async getFilmByFilmId(film_id: number, id_user: number) {
        return prisma.film.findUnique({
            where: {
                film_id: film_id,
                id_user: id_user,
            },
        });
    }

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

    async updateFilm(film: Film){
        const updatedFilm = await prisma.film.update({
            where: {
                film_id: film.film_id,
            },
            data: film,
        });

        return updatedFilm;
    }

    async deleteFilm(film_id: number){
        await prisma.film.delete({
            where:{
                film_id: film_id
            }
        })
    }
    

}

export default FilmModel;