import { ICreateStatementDTO } from "@modules/statements/dtos/CreateStatementDTO";
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
        private userRepository:IUserRepository
        ){}

    async execute({user_id,amount,description,type}:ICreateStatementDTO){
        const userAlreadyExists = this.userRepository.findByUserId(user_id);

        if(!userAlreadyExists){
            throw new AppError('User not exists!!',401);
        }
   
        if(type === 'withdraw'){
            const {balance} = await this.statementRepository.getBalanceUser({user_id});
            console.log(balance)
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
            type
        });

        return statementOperation;
    }
}