import prisma from "../prisma"
import { Request, Response } from "express"

export const editProfile = async(req: Request, res:Response) => {
    try {
        const {id} = req.params;
        const {username, last_name, first_name, password, email, phone_number, photo_profile}   = req.body;

        
        const userData: Record<string, any> = {};

        if(username) userData.username = username;
        if(last_name) userData.last_name = last_name;
        if(first_name) userData.first_name = first_name;
        if(password) userData.password = password;
        if(email) userData.email = email;
        if(phone_number) userData.phone_number = phone_number;
        if(photo_profile) userData.photo_profile = photo_profile;

        const updateProfile = await prisma.user.updateMany({
            where :{
                id_user : Number(id)
            }, data : userData
        })

        const profile = await prisma.user.findFirst({
            where: {
                id_user: Number(id)
            }
        })

        res.status(200).json({ message: 'Profile updated', data: profile });
    

    } catch (error){
        console.error('Error editing profile:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}