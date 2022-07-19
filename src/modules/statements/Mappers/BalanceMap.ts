import { Statement } from "../infra/entities/Statement";

export class BalanceMap{
    static toDTO({balance, statement}:{balance:number, statement:Statement[]}){
        const statementresult = statement.map(({
            id,
            amount,
            description,
            type,
            created_at,
        }) => ({
            id,
            amount:Number(amount),
            description,
            type,
            created_at,
        }));

        return { balance:Number(balance), statement: statementresult}
    }
}