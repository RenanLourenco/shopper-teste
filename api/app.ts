import cors from "cors";
import 'express-async-errors'
import express, { Router } from "express";
import 'dotenv/config'
import { errorMiddleware } from "./middlewares/error";
import path from "path";
import { timingSafeEqual } from "crypto";



export class App {
  public express: express.Application;
  public port: number;
  public routes: Router;

  constructor(port: number, routes: Router) {
    this.port = port;
    this.routes = routes;
    this.express = express();    
    this.initializeAppSetup();
    this.initializeRoutes();
  }

  private initializeAppSetup() {
    this.express.use('/public',express.static(path.join(__dirname, 'public')))
    this.express.use(cors());
    this.express.use(express.json({limit: '60mb'}));
  }

  private initializeRoutes() {
    this.express.use(this.routes);
    this.express.use(errorMiddleware)
  }

  public initializeServer() {
    this.express.listen(this.port, () => {
      console.log("Initialize on port: " + this.port);
    });
  }
}
