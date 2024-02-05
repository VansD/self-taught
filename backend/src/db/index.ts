// import mysql from "mysql2";
// import "dotenv/config";
// //import dbConfig from "../config/db.config";

// export default mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER as string,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME as string
// });

import { Sequelize } from "sequelize-typescript";
import { config, dialect } from "../config/db.config";
import { User } from "../models/user.model";
import { Lesson } from "../models/lesson.model";
import { Task } from "../models/task.model";

class Database {
  public sequelize: Sequelize | undefined;

  constructor() {
    this.connectToDatabase();
  }

  private async connectToDatabase() {
    this.sequelize = new Sequelize({
      database: config.DB,
      username: config.USER,
      password: config.PASSWORD,
      host: config.HOST,
      dialect: dialect,
      pool: {
        max: config.pool.max,
        min: config.pool.min,
        acquire: config.pool.acquire,
        idle: config.pool.idle
      },
      models: [User, Task, Lesson]
    });

    await this.sequelize
      .authenticate()
      .then(() => {
        console.log("Connection has been established successfully.");
      })
      .catch((err) => {
        console.error("Unable to connect to the Database:", err);
      });
  }
}

export default Database;