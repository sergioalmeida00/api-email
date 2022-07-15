import { Router } from "express";
import { routerUser } from "./user.routes";
import { routerAuthenticateUser } from "./autenticationUser.routes";
import { routerStatement } from "./statement.routes";

const router = Router();

router.use('/users',routerUser);
router.use('/teste',routerAuthenticateUser);
router.use('/statement', routerStatement);

export {router}