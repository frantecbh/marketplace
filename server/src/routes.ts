import { Router } from "express";
import { createAccessController, listAllAccessController } from "./controllers/AccessController";
import { createProductsController } from "./controllers/ProductsController";
import { createStoreController, listAllStoreController } from "./controllers/StoreController";
import { createUserController } from "./controllers/UserController";




export const routes = Router()

routes.post("/user", createUserController)


routes.post("/access", createAccessController)
routes.get("/access-list", listAllAccessController)

routes.post("/store/:userId", createStoreController)
routes.get("/store", listAllStoreController)

routes.post("/product/:storeId", createProductsController)
