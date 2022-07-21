import { container } from "tsyringe";
import {IUserRepository} from "@modules/user/repositories/IUserRepository";
import {UserRepository} from "@modules/user/infra/repositories/implementations/UserRepository";
import { IMailProvider } from "@shared/providers/IMailProvider";
import { MailtrapMailProvider } from "@shared/providers/implementations/MailtrapMailProvider";
import { IStatementRepository } from "@modules/statements/repositories/IStatementRespository";
import { StatementRepository } from "@modules/statements/infra/repositories/StatementRespository";
import { ICategoryRepository } from "@modules/statements/repositories/ICategoryRepository";
import { CategoryRepository } from "@modules/statements/infra/repositories/CategoryRepository";

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

// IStatement
container.registerSingleton<IStatementRepository>(
    "StatementRepository",
    StatementRepository
)

// ICategory
container.registerSingleton<ICategoryRepository>(
    'CategoryRepository',
    CategoryRepository
)