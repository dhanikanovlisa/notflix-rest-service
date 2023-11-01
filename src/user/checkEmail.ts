import { Request, Response } from 'express';
import prisma from "../prisma";

export const checkEmail = async (req: Request, res: Response) => {
    try{
        const {email} = req.params;
        const user = await prisma.user.findFirst({
            where: {
                email: email
            }
        })

        if(user !== null){
            res.status(404).json({ message: 'This email is already registered' });
        } else {
            res.status(200).json({ message: 'Email available' });
        }

    } catch (error){
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}