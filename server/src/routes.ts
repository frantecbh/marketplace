import { Router } from "express";
import { createUserController } from "./controllers/UserController";




export const routes = Router()

routes.post("/user", createUserController)