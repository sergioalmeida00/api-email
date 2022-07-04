import { ICreateUserRequestDTO } from "@modules/user/dtos/CreateUserDto";
import { User } from "@modules/user/infra/entities/User";
import { IUserRepository } from "@modules/user/repositories/IUserRepository";
import { IMailProvider } from "@shared/providers/IMailProvider";
import {inject, injectable} from "tsyringe";

@injectable()
export class CreateUserUseCase{

    constructor(
        @inject("UserRepository")
        private userRepository:IUserRepository,
        @inject("MailtrapMailProvider")
        private mailProvider:IMailProvider
    ){}

    async execute(data:ICreateUserRequestDTO){

        const userAlreadyExists = await this.userRepository.findByEmail(data.email); 

        if(userAlreadyExists){
            throw new Error("User already exists!!");
        }

        const user = new User(data);

        await this.userRepository.save(user);

        this.mailProvider.sendMail({
            to:{
                name:data.name,
                email:data.email,
            },
            from:{
                name:"Test send Email",
                email:"test@meuapp.com",
            },
            subject:"Seja Bem-vindo à plataforma",
            body: `<h2>Olá, ${data.name} seu cadastro foi realizado com sucesso!!`
        });
    }
}