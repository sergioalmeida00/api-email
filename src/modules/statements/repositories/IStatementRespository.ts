import { ICreateStatementDTO } from "../dtos/CreateStatementDTO";
import { IGetBalance } from "../dtos/IGetBalanceDTO";
import { Statement } from "../infra/entities/Statement";

interface IStatementRepository{
    create(data:ICreateStatementDTO):Promise<Statement>;
    getBalanceUser(data:IGetBalance):Promise<{balance:number} | {balance: number, statement:Statement[]}>;    
}

export {IStatementRepository}