import { IUserRepository } from '@modules/user/repositories/IUserRepository';
import {compare} from 'bcryptjs';
import { sign } from "jsonwebtoken";
import { inject, injectable } from 'tsyringe';
import authConfig from '../../../../config/auth';

interface IRequest{
    email:string;
    password:string;
}

interface IResponse{
    user:{
        email:string;
        name:string;
    },
    token:string;
}

@injectable()
export class AuthenticateUserUseCase{
    constructor(@inject('UserRepository') private userRepository:IUserRepository){}

    async execute({email,password}:IRequest){
        const user = await this.userRepository.findByEmail(email);

        if(!user){
            throw new Error("Email or Password incorret");
        }

        const isValidPassword = await compare(password, user.password);

        if(!isValidPassword){
            throw new Error("Email or Password incorret");
        }
      
        const token = sign(
            {id:user.id},
            authConfig.jwt.secret,
            {expiresIn:authConfig.jwt.expiresIn}
        );

        const tokenReturn:IResponse = {
            token,
            user:{
                email:user.email,
                name:user.name
            }
        }
        
        return tokenReturn;

    }
}