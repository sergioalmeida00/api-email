import { IGetBalance } from "@modules/statements/dtos/IGetBalanceDTO";
import { Statement } from "@modules/statements/infra/entities/Statement";
import { IStatementRepository } from "@modules/statements/repositories/IStatementRespository";
import { IUserRepository } from "@modules/user/repositories/IUserRepository";
import { AppError } from "@shared/infra/http/errors/AppError";
import { inject, injectable } from "tsyringe";

interface IRequest{
    user_id:string
}

interface IResponse{
    balance:number;
    statement:Statement[]
}

@injectable()
export class GetStatementUseCase{

    constructor(
        @inject('StatementRepository')
        private statementRepository:IStatementRepository,
        @inject('UserRepository')
        private userRepository:IUserRepository
        ){}

    async execute({user_id}:IRequest):Promise<IResponse>{
        const user = await this.userRepository.findByUserId(user_id);

        if(!user){
            throw new AppError('User is not Exists!');
        }

        const resultStatementuser = await this.statementRepository.getBalanceUser({user_id, with_statement:true});
        // console.log(resultStatementuser.balance)

        return resultStatementuser as IResponse;


    }
}