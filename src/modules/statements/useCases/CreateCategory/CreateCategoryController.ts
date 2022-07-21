import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

export class CreateCategoryController{
  async handle(request:Request, response:Response):Promise<Response>{
    const{description_category} = request.body;
    const createCategoryUseCase = container.resolve(CreateCategoryUseCase);
    
    try {
        await createCategoryUseCase.execute(description_category);
        return response.status(201).send();
    } catch (error) {
        return response.status(500).json(error)
    }

  }  
}