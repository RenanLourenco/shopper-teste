import { App } from "./app";
import { routes } from "./routes";
import 'express-async-errors'


const app = new App(3000, routes);

app.initializeServer()



export { app }