import { Request, Response } from 'express';
import { User } from '../../interface';
import UserModel from '../../models/UserModel';

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
                res.status(200).json({ code: 0, message: 'Username or password is incorrect' });
            } else {
                res.status(200).json({ code: 1, message: 'Login success' });
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
                is_admin: false
            });
            res.status(201).json({ message: 'User created', data:user});
    
        } catch (error) {
            console.error('Error creating user:', error);
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
}

export default AuthController;
