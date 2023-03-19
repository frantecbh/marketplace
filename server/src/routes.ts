import { Router } from "express";
import { createAccessController, listAllAccessController } from "./controllers/AccessController";
import { createUserController } from "./controllers/UserController";




export const routes = Router()

routes.post("/user", createUserController)


routes.post("/access", createAccessController)
routes.get("/access-list", listAllAccessController)