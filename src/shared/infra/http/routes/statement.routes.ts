import { Router } from "express";
import { CreateStatementController } from "@modules/statements/useCases/CreateStatement/CreateStatementController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";


const createStatementController = new CreateStatementController();

const routerStatement = Router();

routerStatement.post('/deposit',ensureAuthenticated,createStatementController.handle);
routerStatement.post('/withdraw',ensureAuthenticated,createStatementController.handle);

export {routerStatement}