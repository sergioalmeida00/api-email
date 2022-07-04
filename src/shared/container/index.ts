import { container } from "tsyringe";
import {IUserRepository} from "@modules/user/repositories/IUserRepository";
import {UserRepository} from "@modules/user/infra/repositories/UserRepository";
import { IMailProvider } from "@shared/providers/IMailProvider";
import { MailtrapMailProvider } from "@shared/providers/implementations/MailtrapMailProvider";

// IUserRepository
container.registerSingleton<IUserRepository>(
    "UserRepository",
    UserRepository
)

//IMailProvider
container.registerSingleton<IMailProvider>(
    "MailtrapMailProvider",
    MailtrapMailProvider
)