import dotenv from 'dotenv';
dotenv.config(); 
import { Request, Response, NextFunction } from 'express';
import jwt, { Secret } from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
import { configs } from '../config/configs';

export interface AuthenticatedRequest extends Request {
  user?: {
    id : string,
    email:string
  };
}


export const verifyToken = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7);

    jwt.verify(token, configs.ACCESS_TOKEN_SECRET || '', (err: jwt.VerifyErrors | null, decoded: any) => {
      if (err) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Invalid token' });
      } else {
        req.user = decoded;
        next();
      }
    });
  } else {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Token not provided' });
  }
};





export default verifyToken;