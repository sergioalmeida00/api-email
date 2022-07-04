import { Router } from "express";
import { routerUser } from "./user.routes";

const router = Router();

router.use('/users',routerUser);

export {router}