import { IUserRepository } from "@modules/user/repositories/IUserRepository";
import { User } from "../entities/User";

export class UserRepository implements IUserRepository{
    findByEmail(email: string): Promise<User> {
        throw new Error("Method not implemented.");
    }
    save(user: User): Promise<void> {
        throw new Error("Method not implemented.");
    }

}