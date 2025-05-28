import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

interface JwtPayload {
    user: {
        id: number;
    }
}

export function jwtGenerator(user_id: number): string {
    const payload: JwtPayload = {
        user: {
            id: user_id
        }
    }

    if (!process.env.jwtSecret) throw new Error('JWT secret is not defined');
    return jwt.sign(payload, process.env.jwtSecret, {expiresIn: "1hr"}) 
}