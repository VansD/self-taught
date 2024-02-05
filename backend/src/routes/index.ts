import { Application } from "express";
import adminRoutes from "./admin.routes";
import accountRoutes from "./account.routes";
import teacherRoutes from "./teacher.routes";

export default class Routes {
  constructor(app: Application) {
    app.use("/api/admin", adminRoutes);
    app.use("/api/teacher", teacherRoutes);
    app.use("/api", accountRoutes);
  }
}