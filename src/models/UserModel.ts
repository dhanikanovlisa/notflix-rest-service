import prisma from "../prisma/Prisma";
import { User } from "../interface";

class UserModel{
    
    /**Create User */
    async createUser(user: User) {
        return await prisma.user.create({data: user});
    }
    
    /**Login */
    async login(username: string, password: string) {
        return prisma.user.findFirst({
            where: {
                username,
                password
            }
        })
    }

    /**Get User by User ID */
    async getUserById(id_user: number) {
        return prisma.user.findUnique({
            where: {
                id_user: id_user
            }
        })
    }

    /**Update Profile User */
    async updateProfile(user: User){
        return await prisma.user.update({
            where:{
                id_user: user.id_user
            },
            data:{
                username: user.username,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                phone_number: user.phone_number,
                photo_profile: user.photo_profile
            }
        })
    }

    /**Validation Input */
    async checkUsername(username: string){
        return prisma.user.findFirst({
            where: {
                username: username
            },
            select: {
                username: true,
                first_name: true,
                last_name: true,
                email: true,
                phone_number: true,
                photo_profile: true,
                is_admin: true
            }
        })
    }

    async checkEmail(email: string){
        return prisma.user.findFirst({
            where: {
                email: email
            }
        })
    }
}

export default UserModel;