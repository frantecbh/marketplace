import { Router } from "express";
import { createAccessController, listAllAccessController } from "./controllers/AccessController";
import { createProductsController } from "./controllers/ProductsController";
import { signIn } from "./controllers/SessionController";
import { createStoreController, listAllStoreController } from "./controllers/StoreController";
import { createUserController, getAllUser } from "./controllers/UserController";
import { authMiddleware } from "./middlewares/Authentication";




export const routes = Router()

routes.post("/user", createUserController)
routes.get("/user-list", getAllUser)


routes.post("/access", authMiddleware(["Adm"]), createAccessController)
routes.get("/access-list", authMiddleware(["Adm"]), listAllAccessController)

routes.post("/store/:userId", createStoreController)
routes.get("/store", listAllStoreController)

routes.post("/product/:storeId", createProductsController)

routes.post("/signin", signIn)
