import { NextFunction } from "express";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import generateSecret from "../utils/jwtConfig";

const auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.header('Authorization')?.replace('Bearer ', '');
   
      if (!token) {
        throw new Error();
      }
   
      jwt.verify(token, await generateSecret());
      next();

    } catch (err) {
      res.status(401).send('Please authenticate');
    }
};

export default auth;