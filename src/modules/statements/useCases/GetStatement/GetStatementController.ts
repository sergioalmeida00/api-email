import { BalanceMap } from "@modules/statements/Mappers/BalanceMap";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { GetStatementUseCase } from "./GetStatementUseCase";

export class GetStatementController{
    async handle(request:Request, response:Response):Promise<Response>{
        const user_id = request.userId;
        const getStatementUseCase = container.resolve(GetStatementUseCase);
        
        const result = await getStatementUseCase.execute({user_id});

        const teste = BalanceMap.toDTO(result);        
        
        return response.status(201).json(teste);

    }
}