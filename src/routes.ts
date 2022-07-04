import { Router } from "express";

import { CreateUserController } from "@modules/user/useCases/CreateUser/CreateUseController";
import { CreateUserUseCase } from "@modules/user/useCases/CreateUser/CreateUserUseCase";


const router = Router();
const createUserController = new CreateUserController();


router.post('/user', createUserController.handle);

// router.post('/users',(request, response) => {
//     return response.status(201).send();
// });

export {router}