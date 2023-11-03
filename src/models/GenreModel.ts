import prisma from "../prisma/Prisma";
import { Film } from "../interface";

class GenreModel {

    async getAllGenre(){
        return prisma.genre.findMany();
    }
}

export default GenreModel;