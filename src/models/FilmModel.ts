import prisma from "../prisma/Prisma";
import { Film } from "../interface";

const limit = 10;

class FilmModel{

    async getFilmCOunt(){
        return prisma.film.count();
    }

    /**Return all film for PHP Web App */
    async getAllFilm(offset: number){
        return prisma.film.findMany({
            skip: offset*limit,
            take: limit
        });
    }

    /**Return All Film By User Premium Id */
    async getAllFilmByUserId(id_user: number){
        return prisma.film.findMany({
            where: {id_user: id_user}
        })
    }

    /**Return All Film By User Id */
    async getAllFilmByUserIdPage(id_user: number, page: number, itemsPerPage: number) {
        try {
            const skip = (page - 1) * itemsPerPage;
            const allFilmByUser = await prisma.film.findMany({
                where: { id_user: id_user },
                skip: skip,
                take: itemsPerPage
            });
            return allFilmByUser;
        } catch (error) {
            console.error('Error getting film by user ID and page:', error);
            throw new Error('Internal server error');
        }
    }
    
    /**Return Film by Film Id and User Id */
    async getFilmByFilmId(film_id: number) {
        return prisma.film.findUnique({
            where: {
                film_id: film_id,
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