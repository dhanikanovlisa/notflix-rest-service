import prisma from "../prisma/Prisma";
import { Film } from "../interface";

class GenreModel {

    async getAllGenre(){
        return prisma.genre.findMany();
    }

    async getGenreById(id: number){
        return prisma.genre.findFirst({
            where: {
                genre_id: id
            }
        });
    }

      
}

export default GenreModel;