import { ICreateStatementDTO } from "@modules/statements/dtos/CreateStatementDTO";
import { IGetBalance } from "@modules/statements/dtos/IGetBalanceDTO";
import { IGeteOperation } from "@modules/statements/dtos/IGetOperation";
import { IStatementRepository } from "@modules/statements/repositories/IStatementRespository";
import dataSource from "@shared/infra/typeorm";
import { Repository } from "typeorm";
import { Statement } from "../entities/Statement";

export class StatementRepository implements IStatementRepository{
    private repository:Repository<Statement>;

    constructor(){
        this.repository = dataSource.getRepository(Statement);
    }

    async getOperationStatement({ user_id, id_operation }: IGeteOperation): Promise<Statement> {
        const resultOperation = await this.repository.findOne({
            where:{
                id: id_operation,
                user_id: user_id
            }
        });

        return resultOperation!;
    }

    async getBalanceUser({user_id, with_statement = false}: IGetBalance): Promise<{ balance: number} | {balance:number, statement:Statement[]}> {
        const statementUser = await this.repository.find({
            where:{
                user_id
            },
            relations:{
                categories:true
            }
        });
        const balance = statementUser.reduce((acc, operation) => {
            if (operation.type === 'deposit') {                
              return acc + Number(operation.amount) ;
            } else {
              return acc - Number(operation.amount);
            }
          }, 0);   
          
        if(with_statement){            
            return { balance:Number(balance) , statement:statementUser }
        }
       
        return {balance:Number(balance)}
    }
    
    async create({user_id,amount,description,type,id_category}: ICreateStatementDTO): Promise<Statement> {
        const createStatement = this.repository.create({
            user_id,
            amount:Number(amount),
            description,
            type,
            id_category
        });
        await this.repository.save(createStatement);
        return createStatement;
    }

    async getStatementCategory(id_category: string, user_id:string): Promise<Statement[]> {
        
    //   const resultStatementCategory = await this.repository.find({
    //     where:{
    //         id_category:id_category,
    //         user_id:user_id            
    //     },
    //     relations:{
    //         categories:true,            
    //     },   
    //   });

      const resultStatementCategory = await this.repository.createQueryBuilder('statements')
        .innerJoinAndSelect("statements.categories",'categories')
        .select(['amount','type','description','description_category'])
        .where("statements.id_category = :id_category", {id_category:id_category})
        .andWhere("statements.user_id = :user_id", {user_id: user_id})
        .getRawMany();      
        
      return resultStatementCategory;
    }


}