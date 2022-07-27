import { Statement } from "@modules/statements/infra/entities/Statement";
import { ICategoryRepository } from "@modules/statements/repositories/ICategoryRepository";
import { IStatementRepository } from "@modules/statements/repositories/IStatementRespository";
import { AppError } from "@shared/infra/http/errors/AppError";
import { inject, injectable } from "tsyringe";

interface IResponse{
    result: Statement[],
    balanceCategory:number
}

@injectable()
export class GetStatementCategoryUseCase{
    constructor(
        @inject('StatementRepository')
        private statementRepository:IStatementRepository,
        @inject('CategoryRepository')
        private categoryRepository:ICategoryRepository
    ){}

    async execute(id_category:string, user_id:string):Promise<IResponse>{
        const result = await this.statementRepository.getStatementCategory(id_category, user_id);
        const idCategory = await this.categoryRepository.findByIdCategory(id_category);
        
        if(!idCategory){
            throw new AppError('Id Category is not exists!!');
        }
        
        const balanceCategory = result.reduce((acc, operation) =>{
            return acc + Number(operation.amount)
        },0);

        return {result,balanceCategory};
    }
}