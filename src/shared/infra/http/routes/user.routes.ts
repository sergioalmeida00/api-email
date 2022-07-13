import { Router } from "express";
import { CreateUserController } from "@modules/user/useCases/CreateUser/CreateUseController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";


const routerUser = Router();
const createUserController = new CreateUserController();

routerUser.post('/',ensureAuthenticated, createUserController.handle);

export {routerUser}
