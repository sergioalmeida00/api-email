import {User} from "@modules/user/infra/entities/User";
import { ICreateUserRequestDTO } from "../dtos/CreateUserDto";

interface IUserRepository{
    findByEmail(email:string): Promise<User>;
    create(user:ICreateUserRequestDTO): Promise<void>;
    getAllUsers():Promise<User[]>;
    findByUserId(user_id:string): Promise<User | undefined>;
    
}
export {IUserRepository}