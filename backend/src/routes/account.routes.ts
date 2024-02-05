import { Router } from "express";
import AccountController from "../controllers/auth.controller";

class AccountRoutes {
  router = Router();
  controller = new AccountController();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    this.router.post("/login", this.controller.login);
    this.router.post("/register", this.controller.register);
    this.router.get("/logout", this.controller.logout);
  }
}

export default new AccountRoutes().router;