import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateStatementUseCase } from "./CreateStatementUseCase";

enum OperationType {
    DEPOSIT = 'deposit',
    WITHDRAW = 'withdraw',
  }

export class CreateStatementController {
    async handle(request:Request, response:Response):Promise<Response>{
        const id = request.userId;
        const {amount, description, id_category } = request.body;

        const urlPath = request.originalUrl.split('/');
        const type = urlPath[urlPath.length - 1] as OperationType ;

        const statementUseCase = container.resolve(CreateStatementUseCase);

       const resultUseCase = await statementUseCase.execute({
        user_id:id,
        amount:Number(amount),
        description,
        type,
        id_category
       });
       
       return response.status(201).json(resultUseCase);
    }
}