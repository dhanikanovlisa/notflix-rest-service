import { Request, Response } from 'express';
import prisma from '../../prisma/Prisma';

export const register = async (req: Request, res: Response) => {
    try {
        const { username, email, phone_number, password, first_name, last_name } = req.body;

        const user = await prisma.user.create({
            data: {
                username,
                email,
                phone_number,
                password,
                first_name,
                last_name,
            },
        });
        res.status(201).json({ message: 'User created'});

    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
