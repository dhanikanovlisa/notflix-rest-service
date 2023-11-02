import { Request, Response } from 'express';
import prisma from "../../prisma/Prisma";

export const checkEmail = async (req: Request, res: Response) => {
    try{
        const {email} = req.params;
        const user = await prisma.user.findFirst({
            where: {
                email: email
            }
        })

        if(user !== null){
            res.status(200).json({ code: 1, message: 'This email is already registered' });
        } else {
            res.status(200).json({ code: 0, message: 'Email does not exists' });
        }

    } catch (error){
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}