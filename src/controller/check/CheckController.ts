import { Request, Response } from 'express';
import { User } from '../../interface';
import UserModel from '../../models/UserModel';
import jwt from 'jsonwebtoken';
import generateSecret from '../../utils/jwtConfig';

class CheckController{
    private userModel: UserModel;

    constructor(){
        this.userModel = new UserModel();
    }

    async getAdminEmail(req: Request, res: Response){
        try {
            const user = await this.userModel.getAdminEmail();
            res.status(200).json({ admin: user});
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    async checkEmail(req: Request, res:Response){
        try {
            const {email} = req.params;
            const user = await this.userModel.checkEmail(email);
    
            if(user !== null){
                res.status(200).json({ code: 1, message: 'This email is already registered' });
            } else {
                res.status(200).json({ code: 0, message: 'Email does not exists' });
            }
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    async checkUsername(req: Request, res: Response){
        try {
            const {username} = req.params;
            const user = await this.userModel.checkUsername(username);
    
            if(user !== null){
                res.status(200).json({ code: 1, message: 'This username is already registered' });
            } else {
                res.status(200).json({ code: 0, message: 'Username does not exists' });
            }
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    async checkCurrentUser(req: Request, res: Response){
        try {
            const token = req.header('Authorization')?.replace('Bearer ', '');
            if (!token) {
                throw new Error();
            }

            const payload = jwt.verify(token, generateSecret());
            if (typeof payload === 'string') { 
                throw new Error();
            }

            const user = await this.userModel.checkUsername(payload.username);

            if(user !== null){
                res.status(200).json({ isAuth: true, user: user });
            } else {
                res.status(400).json({ isAuth: false });
            }
            
        } catch (error) {
            res.status(500).json({ isAuth: false});
        }
    }
}

export default CheckController;
