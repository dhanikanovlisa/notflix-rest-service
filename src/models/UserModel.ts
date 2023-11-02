import prisma from "../prisma/Prisma";
import { User } from "../interface";

class UserModel{
    
    async createUser(user: User) {
        await prisma.user.create({data: user});
    }

    async getUserById(id_user: number) {
        return prisma.user.findUnique({
            where: {
                id_user: id_user
            }
        })
    }


}

export default UserModel;