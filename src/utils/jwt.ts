import { EXPIRES_IN, JWT_SECRET } from "../config/config";
import jwt, { type JwtPayload } from 'jsonwebtoken'

export const signToken = (userId: string): string => {
  return jwt.sign({ id: userId }, JWT_SECRET, {
    expiresIn: "1D"
  });
};


export const verifyToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET);
};