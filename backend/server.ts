import express, { Application } from "express";
import Server from "./src/index";
import "dotenv/config";

const app: Application = express();
const server: Server = new Server(app);
const PORT: number = process.env.HOST_PORT ? parseInt(process.env.HOST_PORT, 10) : 3001;
const URL: string = process.env.HOST_URL || 'localhost';

app
  .listen(PORT, URL, function () {
    console.log(`Server (${URL}) is running on port ${PORT}.`);
  })
  .on("error", (err: any) => {
    if (err.code === "EADDRINUSE") {
      console.log("Error: address already in use");
    } else {
      console.log(err);
    }
  });