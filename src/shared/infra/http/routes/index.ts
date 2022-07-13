import { Router } from "express";
import { routerUser } from "./user.routes";
import { routerAuthenticateUser } from "./autenticationUser.routes";

const router = Router();

router.use('/users',routerUser);
router.use('/teste',routerAuthenticateUser);

export {router}