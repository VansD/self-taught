import { Router } from "express";
import AdminController from "../controllers/admin.controller";
import { verifyToken } from "../middleware/authJwt";

class AdminRoutes {
  router = Router();
  controller = new AdminController();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    //this.router.get("/users", verifyToken, this.controller.getAllWithCount );
    this.router.get("/users", this.controller.getAllWithCount );
    
    //this.router.get("/users", this.controller.getAll);

    this.router.get("/users/:id", this.controller.getOne);

    this.router.put("/users/:id", this.controller.update);

    this.router.delete("/users/:id", this.controller.delete);
  }
}

export default new AdminRoutes().router;