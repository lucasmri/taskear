import express from "express";
import { usuariosController } from "../controllers/usuariosController.js";

export const usuariosRouter = express.Router();
const controller = new usuariosController();

usuariosRouter.get("/", controller.findAll);