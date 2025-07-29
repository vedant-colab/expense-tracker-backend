import type {Request} from 'express';
export interface IUser {
    name : string;
    email : string;
    password : string;
    comparePassword(password : string) : Promise<boolean>;
}


export interface AuthenticatedRequest extends Request {
    user : {
        id : string;
    }
}