import { Request, Response } from 'express';
import { User } from '../../interface';
import UserModel from '../../models/UserModel';
import checkAndUpdateField from '../../utils/checkandUpdateField';

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

            const updateUsername = checkAndUpdateField(username, user.username) ?? "";
            const updateLastName = checkAndUpdateField(last_name, user.last_name ?? "") ?? "";
            const updateFirstName = checkAndUpdateField(first_name, user.first_name ?? "") ?? "";
            const updateEmail =checkAndUpdateField(email, user.email) ?? "";
            const updatePhoneNumber = checkAndUpdateField(phone_number, user.phone_number ?? "") ?? "";
            const updatePhotoProfile = checkAndUpdateField(profileName, user.photo_profile ?? "") ?? "";


            const userData: User = {
                id_user: Number(id),
                username: updateUsername.toString(),
                last_name: updateLastName.toString(),
                first_name: updateFirstName.toString(),
                email: updateEmail.toString(),
                phone_number: updatePhoneNumber.toString(),
                photo_profile: updatePhotoProfile.toString(),
            };


            this.userModel.updateProfile(userData);
            res.status(200).json({ message: 'Profile updated' });


        } catch (error) {
            console.error('Error editing profile:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

}

export default ProfileController