import {User} from "@modules/user/infra/entities/User";
import { ICreateUserRequestDTO } from "../dtos/CreateUserDto";

interface IUserRepository{
    findByEmail(email:string): Promise<User>;
    create(user:ICreateUserRequestDTO): Promise<void>;
    
}
export {IUserRepository}