import prisma from "../prisma/Prisma";


class FilmGenreModel{

    async addFilmGenre(film_id: number, filmGenres: number[]){
        const filmGenre = await prisma.film_genre.createMany({
            data: filmGenres.map((genre: number) => ({
                film_id: film_id,
                genre_id: genre,
            })),
        })
        return filmGenre;
    }

    async getFilmGenreByFilmId(film_id: number){
        return prisma.film_genre.findMany({where: {
            film_id: film_id
        }})
    }
    
    async deleteFilmGenre(film_id: number){
        await prisma.film_genre.deleteMany({
            where: {
                film_id: film_id,
            },
        });
    }




}

export default FilmGenreModel;