import "reflect-metadata";
import express from "express";
import { router } from "@shared/infra/http/routes";
import '@shared/container';

const app = express();

app.use(express.json());
app.use(router);

export { app }