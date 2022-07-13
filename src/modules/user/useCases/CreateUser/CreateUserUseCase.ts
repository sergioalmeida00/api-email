import { ICreateUserRequestDTO } from "@modules/user/dtos/CreateUserDto";
import { User } from "@modules/user/infra/entities/User";
import {hash} from 'bcryptjs';
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

    async execute({name,email,password}:ICreateUserRequestDTO){
        const userAlreadyExists = await this.userRepository.findByEmail(email); 
                
        if(userAlreadyExists){
            throw new Error("User already exists!!");
        }
        const passwordHash = await hash(password,8);
        await this.userRepository.create({
            email,
            name,
            password:passwordHash
        });

        this.mailProvider.sendMail({
            to:{
                name:name,
                email:email,
            },
            from:{
                name:"Test send Email",
                email:"test@meuapp.com",
            },
            subject:"Seja Bem-vindo à plataforma",
            body: `<h2>Olá, ${name} seu cadastro foi realizado com sucesso!!`
        });
    }
}