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
            res.status(200).json({ code: 1, message: 'Username already exists' });
        } else {
            res.status(200).json({ code: 0, message: 'Username does not exists' });
        }

    } catch (error){
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}