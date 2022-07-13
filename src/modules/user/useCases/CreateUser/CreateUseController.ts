import { AppError } from "@shared/infra/http/errors/AppError";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateUserUseCase } from "./CreateUserUseCase";

export class CreateUserController{

    async handle(request:Request, response:Response):Promise<Response>{

        const{name,email,password} = request.body;
        const id = request.userId;
        const createUserUseCase = container.resolve(CreateUserUseCase);
  
        await createUserUseCase.execute({name,email,password});
        return response.status(201).send();

    }
}