import { Request, Response } from 'express';
import prisma from "../prisma";

export const login = async (req: Request, res: Response) => {
    try{
        const {username, password} = req.body;
        const user = await prisma.user.findFirst({
            where: {
                username,
                password
            }
        })

        if(user == null){
            res.status(200).json({ code: 0, message: 'Username or password is incorrect' });
        } else {
            res.status(200).json({ code: 1, message: 'Login success' });
        }

    } catch (error){
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}