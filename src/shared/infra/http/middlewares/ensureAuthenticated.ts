import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import authConfig from '../../../../config/auth';


interface ITokenPayload{
    id:string;
    iat:number;
    exp:number;
}

export async function ensureAuthenticated(request:Request, response:Response, next:NextFunction){
    const authHeader = request.headers.authorization;

    if(!authHeader){
        throw new Error("Token missing");
    }
    const token = authHeader.replace('Bearer','').trim();

    try {

        const data = verify(token,authConfig.jwt.secret);
        const{id} = data as ITokenPayload;
        request.userId = id
        return next();
    } catch (error) {
        return response.sendStatus(401);
    }

}