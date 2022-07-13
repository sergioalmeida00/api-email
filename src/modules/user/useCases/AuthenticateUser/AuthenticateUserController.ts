import { Request, Response } from "express";
import { container } from "tsyringe";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

export class AuthenticateUserController{

    
    async handle(request:Request, response:Response):Promise<Response>{
        const authenticateUserUseCase = container.resolve(AuthenticateUserUseCase);
        const {email,password} = request.body;  

        try {
            const authenticate = await authenticateUserUseCase.execute({email,password});
            console.log(authenticate)
           return response.status(201).json(authenticate);           
        } catch (error) {
            return response.status(400).json({message:'error'});
        }
    }
}