import { ICreateStatementDTO } from "@modules/statements/dtos/CreateStatementDTO";
import { ICategoryRepository } from "@modules/statements/repositories/ICategoryRepository";
import { IStatementRepository } from "@modules/statements/repositories/IStatementRespository";
import { IUserRepository } from "@modules/user/repositories/IUserRepository";
import { AppError } from "@shared/infra/http/errors/AppError";
import { inject, injectable } from "tsyringe";

@injectable()
export class CreateStatementUseCase{
    
    constructor(
        @inject('StatementRepository')
        private statementRepository:IStatementRepository,
        @inject('UserRepository')
        private userRepository:IUserRepository,
        @inject('CategoryRepository')
        private categoryRepository:ICategoryRepository
        ){}

    async execute({user_id,amount,description,type,id_category}:ICreateStatementDTO){
        const userAlreadyExists = await this.userRepository.findByUserId(user_id);
        const categoryAlreadyExists = await this.categoryRepository.findByIdCategory(id_category);

        if(!userAlreadyExists || !categoryAlreadyExists){
            throw new AppError('User not exists or Category not exists!!',401);
        }
   
        if(type === 'withdraw'){
            const { balance } = await this.statementRepository.getBalanceUser({user_id});
      
            if(balance < amount){
                throw new AppError("Insufficient!");
            }
        }
        
        if(amount < 0 ){
            throw new AppError('Value is negative!')
        }

        const statementOperation = await this.statementRepository.create({
            user_id,
            amount:Number(amount),
            description,
            type,
            id_category
        });
        return statementOperation;
    }
}