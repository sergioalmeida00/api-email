import { GetAllUserUseCase } from "./GetAllUserUseCase";
import { container } from "tsyringe";
import { Request, Response } from "express";

export class GetAllUserController{
    async handle(request:Request, response:Response):Promise<Response>{
        const getAllUseCase = container.resolve(GetAllUserUseCase);

        try {
            const result = await getAllUseCase.execute();
            return response.status(201).json(result);
        } catch (error) {
            return response.status(400).json({message:'error'});
        }
    }
}