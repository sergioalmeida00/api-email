import { ICreateStatementDTO } from "../dtos/CreateStatementDTO";
import { IGetBalance } from "../dtos/IGetBalanceDTO";
import { IGeteOperation } from "../dtos/IGetOperation";
import { Statement } from "../infra/entities/Statement";

interface IStatementRepository{
    create(data:ICreateStatementDTO):Promise<Statement>;
    getBalanceUser(data:IGetBalance):Promise<{balance:number} | {balance: number, statement:Statement[]}>;    
    getOperationStatement({user_id,id_operation }:IGeteOperation):Promise<Statement>;
}

export {IStatementRepository}