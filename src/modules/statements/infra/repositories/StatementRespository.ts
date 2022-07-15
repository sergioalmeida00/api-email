import { ICreateStatementDTO } from "@modules/statements/dtos/CreateStatementDTO";
import { IGetBalance } from "@modules/statements/dtos/IGetBalanceDTO";
import { IStatementRepository } from "@modules/statements/repositories/IStatementRespository";
import dataSource from "@shared/infra/typeorm";
import { Repository } from "typeorm";
import { Statement } from "../entities/Statement";

export class StatementRepository implements IStatementRepository{
    private repository:Repository<Statement>;

    constructor(){
        this.repository = dataSource.getRepository(Statement);
    }
    async getBalanceUser({user_id}: IGetBalance): Promise<{ balance: number}> {
        const statementUser = await this.repository.find({
            where:{
                user_id
            }
        });
        const balance = statementUser.reduce((acc, operation) => {
            if (operation.type === 'deposit') {                
              return acc + operation.amount;
            } else {
              return acc - operation.amount;
            }
          }, 0);     
        
        return {balance}
    }
    
    async create({user_id,amount,description,type}: ICreateStatementDTO): Promise<Statement> {

        const createStatement = this.repository.create({
            user_id,
            amount,
            description,
            type
        });

        await this.repository.save(createStatement);

        return createStatement;
    }


}