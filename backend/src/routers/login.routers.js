/* Archivo para implementar la ruta de para el endpoint de rutas */
import { Router } from "express";
import loginService from "../controllers/login.controller.js";

export const loginRouter = Router();

loginRouter.post("/", loginService);
