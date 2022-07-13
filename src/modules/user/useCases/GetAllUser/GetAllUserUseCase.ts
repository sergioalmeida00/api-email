import { User } from "@modules/user/infra/entities/User";
import { IUserRepository } from "@modules/user/repositories/IUserRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class GetAllUserUseCase{
    constructor(@inject('UserRepository') private userRepository:IUserRepository){}

    async execute():Promise<User[]>{
        const users = await this.userRepository.getAllUsers();

        return users;
    }

}