import {User} from "@modules/user/infra/entities/User";

interface IUserRepository{
    findByEmail(email:string): Promise<User>;
    save(user:User): Promise<void>;
}
export {IUserRepository}