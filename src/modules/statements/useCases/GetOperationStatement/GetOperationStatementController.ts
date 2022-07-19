import { Request, Response } from "express";
import { container } from "tsyringe";
import { GetOperationStatementUseCase } from "./GetOperationStatementUseCase";

export class GetOperationStatementController {
    async handle(request:Request, response:Response):Promise<Response>{
        const user_id = request.userId;
        const {id_operation} = request.params;
        const getOperationStatemtUseCase = container.resolve(GetOperationStatementUseCase);

        const resultOperation = await getOperationStatemtUseCase.execute({user_id,id_operation});
        return response.status(201).json(resultOperation);
        
    }
}