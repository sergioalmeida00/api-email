import { User } from "@modules/user/infra/entities/User";
import { IUserRepository } from "../IUserRepository";

export class UserRepository implements IUserRepository{

    private users:User[] = [];

    async findByEmail(email: string): Promise<User> {
        const user = this.users.find(user => user.email === email);
    
        return user!;
    }

    async save(user: User): Promise<void> {
        this.users.push(user)
    }

}