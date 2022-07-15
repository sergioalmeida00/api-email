import { Router } from "express";
import { AuthenticateUserController } from "@modules/user/useCases/AuthenticateUser/AuthenticateUserController";

const routerAuthenticateUser = Router();
const authenticateController = new AuthenticateUserController();


routerAuthenticateUser.post('/',authenticateController.handle);

export {routerAuthenticateUser}