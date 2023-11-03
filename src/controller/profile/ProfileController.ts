import { Request, Response } from 'express';
import { User } from '../../interface';
import UserModel from '../../models/UserModel';
import prisma from '../../prisma/Prisma';

class ProfileController {

    private userModel: UserModel;

    constructor() {
        this.userModel = new UserModel();
    }

    async getProfileById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const profile = await this.userModel.getUserById(Number(id));

            if (profile === null) {
                res.status(404).json({ error: 'Profile not found' });
            } else {
                res.status(200).json({ message: 'Profile found', data: profile });
            }


        } catch (error) {
            console.error('Error getting profile:', error);
            res.status(500).json({ error: 'Internal server error' });
        }

    }

    async updateProfile(req: Request, res: Response) {
        try {
            // const { id } = req.params;
            // const { username, last_name, first_name, password, email, phone_number, photo_profile } = req.body;


            // const userData: User = {
            //     id_user: Number(id),
            //     username,
            //     last_name,
            //     first_name,
            //     password,
            //     email,
            //     phone_number,
            //     photo_profile,
            // };

            // if (username) userData.username = username;
            // if (last_name) userData.last_name = last_name;
            // if (first_name) userData.first_name = first_name;
            // if (password) userData.password = password;
            // if (email) userData.email = email;
            // if (phone_number) userData.phone_number = phone_number;
            // if (photo_profile) userData.photo_profile = photo_profile;

            // const updateProfile = await this.userModel.updateProfile(userData);


            // res.status(200).json({ message: 'Profile updated', data: updateProfile });


        } catch (error) {
            console.error('Error editing profile:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }


}

export default ProfileController