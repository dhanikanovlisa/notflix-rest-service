import prisma from "../prisma/Prisma";
import { User } from "../interface";
import HashPassword from "../utils/HashPassword";

class UserModel{
    
    /**Create User */
    async createUser(user: User) {
        return await prisma.user.create({data: user});
    }
    

    async login(username: string, password: string) {
        const user  = await prisma.user.findFirst({
            where: {
                username
            }
        })

        if (user == null) return null;

        if (await HashPassword.compare(password, user.password)){
            return user;
        }
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

    async getAdminEmail(){
        return prisma.user.findMany({
            where: {
                is_admin: true
            },
            select: {
                email: true
            }
        })
    }
}

export default UserModel;