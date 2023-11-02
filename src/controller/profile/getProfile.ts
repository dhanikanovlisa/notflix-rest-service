import prisma from "../../prisma/Prisma"
import { Request, Response } from "express"

export const getProfileById = async(req: Request, res:Response) => {

    try{
        const {id} = req.params;
        const profile = await prisma.user.findFirst({
            where: {
                id_user: Number(id)
            }
        })

        if (profile === null){
            res.status(404).json({ error: 'Profile not found' });
        } else {
            res.status(200).json({ message: 'Profile found', data: profile });
        }


    } catch (error){
        console.error('Error getting profile:', error);
        res.status(500).json({ error: 'Internal server error' });
    }


}