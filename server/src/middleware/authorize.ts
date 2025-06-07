import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

interface UserPayload {
    user: {
        id: string;
    }
}

// Custom interface for extending Express Request
interface CustomRequest extends Request {
    user?: {
        id: string;
    };
}

// This middleware will only continue if the token is inside the local storage
export default function authorize(
    req: CustomRequest,
    res: Response,
    next: NextFunction
): void {
    // Get token from header
    const authHeader = req.header('Authorization');

    // If the header is not present, return 403
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(403).json({ msg: 'authorization denied' });
        return;
    }

    // Extract the token from the header
    const token = authHeader.split(' ')[1];

    // Verify token
    try {
        // It is going to give us the user id (user:{id: user.id})
        const verify = jwt.verify(token, process.env.jwtSecret!) as UserPayload;

        req.user = verify.user;
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
}