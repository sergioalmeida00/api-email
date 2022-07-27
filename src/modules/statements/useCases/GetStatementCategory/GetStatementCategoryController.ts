import { Request, Response } from "express";
import { container } from "tsyringe";
import { GetStatementCategoryUseCase } from "./GetStatementCategoryUseCase";

export class GetStatementCategoryController{
    async handle(request:Request, response: Response):Promise<Response>{
        const {id_category} = request.params;
        const user_id = request.userId;
        const getStatementcategoryuseCase = container.resolve(GetStatementCategoryUseCase);

        try {
            const result = await getStatementcategoryuseCase.execute(id_category, user_id);
            
             return response.status(200).json(result);
        } catch (error) {
            return response.status(500).json(error);
        }
    }
}