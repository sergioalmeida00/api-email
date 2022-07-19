import { IGeteOperation } from "@modules/statements/dtos/IGetOperation";
import { Statement } from "@modules/statements/infra/entities/Statement";
import { IStatementRepository } from "@modules/statements/repositories/IStatementRespository";
import { IUserRepository } from "@modules/user/repositories/IUserRepository";
import { AppError } from "@shared/infra/http/errors/AppError";
import { inject, injectable } from "tsyringe";

@injectable()
export class GetOperationStatementUseCase{

    constructor(
        @inject('StatementRepository')
        private statementRespository:IStatementRepository,
        @inject('UserRepository')
        private userRepository:IUserRepository
    ){}

    async execute({user_id,id_operation}:IGeteOperation):Promise<Statement>{
        const user = await this.userRepository.findByUserId(user_id);

        if(!user){
            throw new AppError('User is not Exists!!');
        }

        const operationStatement = await this.statementRespository.getOperationStatement({user_id,id_operation});

        if(!operationStatement){
            throw new AppError('Not exists operation!!');
        }

        return operationStatement;
    }
}