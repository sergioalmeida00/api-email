import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateUserUseCase } from "./CreateUserUseCase";

export class CreateUserController{

    async handle(request:Request, response:Response):Promise<Response>{

        const{name,email,password} = request.body;
        const id = request.userId;
        const createUserUseCase = container.resolve(CreateUserUseCase);
        console.log(id)
        try {
            await createUserUseCase.execute({name,email,password});
            return response.status(201).send();

        } catch (error) {            
            return response.status(400).json({message:'error'});
        }
    }
}