// import "reflect-metadata";
import express from "express";
import { createConnection } from "@shared/infra/typeorm";
import { router } from "@shared/infra/http/routes";
import '@shared/container';
import '@shared/infra/typeorm';
import doteenv from 'dotenv';
doteenv.config();

createConnection();
const app = express();

app.use(express.json());
app.use(router);

export { app }