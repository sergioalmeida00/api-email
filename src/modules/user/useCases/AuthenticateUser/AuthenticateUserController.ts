import { Request, Response } from "express";
import { container } from "tsyringe";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

export class AuthenticateUserController{

    
    async handle(request:Request, response:Response):Promise<Response>{
        const authenticateUserUseCase = container.resolve(AuthenticateUserUseCase);
        const {email,password} = request.body;  

        const authenticate = await authenticateUserUseCase.execute({email,password});
        return response.status(201).json(authenticate);           
     
    }
}