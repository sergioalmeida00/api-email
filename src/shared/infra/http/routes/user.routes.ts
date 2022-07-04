import { Router } from "express";
import { CreateUserController } from "@modules/user/useCases/CreateUser/CreateUseController";

const createUserController = new CreateUserController();

const routerUser = Router();

routerUser.post('/',createUserController.handle);

export {routerUser}
