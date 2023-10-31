import { Request, Response } from 'express';
import prisma from "../prisma";

export const checkUsername = async (req: Request, res: Response) => {
    try{
        const {username} = req.params;
        const user = await prisma.user.findFirst({
            where: {
                username: username
            }
        })

        if(user !== null){
            res.status(404).json({ message: 'Username already exist' });
        } else {
            res.status(200).json({ message: 'Username available' });
        }

    } catch (error){
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}