import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

interface JwtPayload {
    user: {
        id: number;
        isAdmin: boolean;
    }
}

export default function jwtGenerator(user_id: number, isAdmin: boolean): string {
    const payload: JwtPayload = {
        user: {
            id: user_id,
            isAdmin: isAdmin
        }
    }

    if (!process.env.jwtSecret) throw new Error('JWT secret is not defined');
    return jwt.sign(payload, process.env.jwtSecret, {expiresIn: "1hr"}) 
}