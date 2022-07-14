// import "reflect-metadata";
import express, { NextFunction, Request, Response } from "express";
import 'express-async-errors';
import { createConnection } from "@shared/infra/typeorm";
import { router } from "@shared/infra/http/routes";
import '@shared/container';
import '@shared/infra/typeorm';
import doteenv from 'dotenv';
import { AppError } from "./errors/AppError";
doteenv.config();

createConnection();
const app = express();

app.use(express.json());
app.use(router);

// MIDDLEWARES TREATMENT ERROS
app.use((err:Error, request:Request, response:Response, next:NextFunction) =>{
    
    if(err instanceof AppError){
        return response.status(err.statusCode).json({
            message:err.message
        });
    }

    return response.status(500).json({
        status:"error",
        message: `Internal server error - ${err.message}`
    });

});

export { app }