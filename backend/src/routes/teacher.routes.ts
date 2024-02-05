import { Router } from "express";
import TeacherController from "../controllers/teacher.controller";
import { verifyToken } from "../middleware/authJwt";

class TeacherRoutes {
  router = Router();
  controller = new TeacherController();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    this.router.get("/tasks", verifyToken, this.controller.getAllTasksWithCount );
    this.router.get("/tasks/:id", verifyToken, this.controller.getOneTask);
    this.router.post("/tasks", verifyToken, this.controller.createTask);
    this.router.put("/tasks/:id", verifyToken, this.controller.updateTask);
    this.router.delete("/tasks/:id", verifyToken, this.controller.deleteTask);
  }
}

export default new TeacherRoutes().router;