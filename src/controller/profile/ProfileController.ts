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
            const { id } = req.params;
            const { username, last_name, first_name, email, phone_number, profileName, profileSize } = req.body;

            
            const user = await this.userModel.getUserById(Number(id));
            
            if (!user){
                return res.status(404).json({ error: 'User not found' });
            }

            if(profileSize > 80000){
                return res.status(400).json({ error: 'Image size too large' });
            }

            const updateUsername = this.checkAndUpdateField(username, user.username) ?? "";
            const updateLastName = this.checkAndUpdateField(last_name, user.last_name ?? "") ?? "";
            const updateFirstName = this.checkAndUpdateField(first_name, user.first_name ?? "") ?? "";
            const updateEmail = this.checkAndUpdateField(email, user.email) ?? "";
            const updatePhoneNumber = this.checkAndUpdateField(phone_number, user.phone_number ?? "") ?? "";
            const updatePhotoProfile = this.checkAndUpdateField(profileName, user.photo_profile ?? "") ?? "";


            const userData: User = {
                id_user: Number(id),
                username: updateUsername,
                last_name: updateLastName,
                first_name: updateFirstName,
                email: updateEmail,
                phone_number: updatePhoneNumber,
                photo_profile: updatePhotoProfile,
            };


            this.userModel.updateProfile(userData);
            res.status(200).json({ message: 'Profile updated' });


        } catch (error) {
            console.error('Error editing profile:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    checkAndUpdateField(newData: string  | undefined, existingData: string) {
        if (newData === undefined || newData === null || newData === "") {
            return existingData;
        } else {
            if (typeof newData === "string") {
                if(newData === ""){
                    return existingData;
                }
                else if (newData !== existingData) {
                    return newData;
                } else {
                    return existingData;
                }
            }
        }
    }    

}

export default ProfileController