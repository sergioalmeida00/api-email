import { Statement } from "@modules/statements/infra/entities/Statement";
import { IStatementRepository } from "@modules/statements/repositories/IStatementRespository";
import { inject, injectable } from "tsyringe";

interface IResponse{
    result: Statement[],
    balanceCategory:number
}

@injectable()
export class GetStatementCategoryUseCase{
    constructor(
        @inject('StatementRepository')
        private statementRepository:IStatementRepository
    ){}

    async execute(id_category:string, user_id:string):Promise<IResponse>{
        const result = await this.statementRepository.getStatementCategory(id_category, user_id);
        
        const balanceCategory = result.reduce((acc, operation) =>{
            return acc + Number(operation.amount)
        },0);

        return {result,balanceCategory};
    }
}