import { Router } from "express";
import { CreateStatementController } from "@modules/statements/useCases/CreateStatement/CreateStatementController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { GetStatementController } from "@modules/statements/useCases/GetStatement/GetStatementController";
import { GetOperationStatementController } from "@modules/statements/useCases/GetOperationStatement/GetOperationStatementController";
import { CreateCategoryController } from "@modules/statements/useCases/CreateCategory/CreateCategoryController";
import { GetStatementCategoryController } from "@modules/statements/useCases/GetStatementCategory/GetStatementCategoryController";

const createStatementController = new CreateStatementController();
const getStatementController = new GetStatementController();
const getOperationStatementController = new GetOperationStatementController();
const createCategoryController = new CreateCategoryController();
const getStatementeCategoryController = new GetStatementCategoryController();

const routerStatement = Router();

routerStatement.post('/deposit',ensureAuthenticated,createStatementController.handle);
routerStatement.post('/withdraw',ensureAuthenticated,createStatementController.handle);
routerStatement.post('/category', ensureAuthenticated, createCategoryController.handle);
routerStatement.get('/getBalance',ensureAuthenticated, getStatementController.handle);
routerStatement.get('/getOperation/:id_operation',ensureAuthenticated,getOperationStatementController.handle);
routerStatement.get('/getStatementCategory/:id_category',ensureAuthenticated,getStatementeCategoryController.handle);

export {routerStatement}