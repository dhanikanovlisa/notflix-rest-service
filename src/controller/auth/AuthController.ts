import { Request, Response } from 'express';
import { User } from '../../interface';
import UserModel from '../../models/UserModel';
import jwt from 'jsonwebtoken';
import generateSecret from '../../utils/jwtConfig';

class AuthController{
    private userModel: UserModel;

    constructor(){
        this.userModel = new UserModel();
    }

    async login(req: Request, res: Response){
        try {
            const {username, password} = req.body;
            const user = await this.userModel.login(username, password)
            if(user == null){
                res.status(400).json({ message: 'Username or password is incorrect' });
            } else {
                const accessToken = jwt.sign(
                    {username: user.username, is_admin: user.is_admin}, 
                    generateSecret(), 
                    {expiresIn: '1h'}
                )
                
                res.status(200).json({ 
                    message: 'Login success',
                    token: accessToken,
                    is_admin: user.is_admin,
                    id: user.id_user
                });
            }
    
        } catch (error){
            console.error('Error:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    async register(req: Request, res: Response){
        try {
            const { username, email, phone_number, password, first_name, last_name } = req.body;
    
            const user = await this.userModel.createUser({
                username,
                email,
                phone_number,
                password,
                first_name,
                last_name,
                is_admin: false,
                photo_profile: 'profile-placeholder.png'
            });
            res.status(201).json({ message: 'User created', data:user});
    
        } catch (error) {
            console.error('Error creating user:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}

export default AuthController;
