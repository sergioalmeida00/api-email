import { ICreateUserRequestDTO } from "@modules/user/dtos/CreateUserDto";
import { User } from "@modules/user/infra/entities/User";
import { IUserRepository } from "@modules/user/repositories/IUserRepository";
import dataSource from "@shared/infra/typeorm";
import { Repository } from "typeorm";

export class UserRepository implements IUserRepository{

    private repository:Repository<User>;

    constructor(){
        this.repository = dataSource.getRepository(User);
    }

   async create({name,email,password}: ICreateUserRequestDTO): Promise<void> {
        const user = this.repository.create({name,email,password})
        await this.repository.save(user);
    }

    
    async findByEmail(email: string): Promise<User> {
        const user = await this.repository.findOneBy({email})
        return user!;
    }
}