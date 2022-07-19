import { Router } from "express";
import { CreateStatementController } from "@modules/statements/useCases/CreateStatement/CreateStatementController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { GetStatementController } from "@modules/statements/useCases/GetStatement/GetStatementController";

const createStatementController = new CreateStatementController();
const getStatementController = new GetStatementController();

const routerStatement = Router();

routerStatement.post('/deposit',ensureAuthenticated,createStatementController.handle);
routerStatement.post('/withdraw',ensureAuthenticated,createStatementController.handle);
routerStatement.get('/getBalance',ensureAuthenticated, getStatementController.handle);

export {routerStatement}