import { Router } from "express";
import { CreateUserController } from "@modules/user/useCases/CreateUser/CreateUseController";
import { GetAllUserController } from "@modules/user/useCases/GetAllUser/GetAllUserController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";


const routerUser = Router();
const createUserController = new CreateUserController();
const getAllUserController = new GetAllUserController()

routerUser.post('/', ensureAuthenticated,createUserController.handle);
routerUser.get('/all',ensureAuthenticated,getAllUserController.handle)
export {routerUser}
