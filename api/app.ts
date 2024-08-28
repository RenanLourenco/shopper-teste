import cors from "cors";
import 'express-async-errors'
import express, { Router } from "express";
import 'dotenv/config'
// import { errorMiddleware } from "./middlewares/error";
import YAML from "yamljs";
import * as path from "path";



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
    this.express.use(cors());
    this.express.use(express.json({limit: '60mb'}));

    // const swaggerPath = path.resolve(__dirname, 'swagger.yaml');
    // const swaggerDocument = YAML.load(swaggerPath);

    // Configurando o Swagger UI
    // this.express.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


  }

  private initializeRoutes() {
    this.express.use(this.routes);
    // this.express.use(errorMiddleware)
  }

  public initializeServer() {
    this.express.listen(this.port, () => {
      console.log("Initialize on port: " + this.port);
    });
  }
}
