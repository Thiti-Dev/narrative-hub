import "reflect-metadata";
import Koa from 'koa';
import logger from 'koa-logger'
import json from 'koa-json'
import bodyParser from 'koa-bodyparser'
import errorHandler from '../middlewares/error-handler.mjs';
import { registerModules } from "./module-registration.mjs";
import { ManagementModule } from "../modules/managements/managements.module.mjs";

const PORT: number = 3000

const app: Koa = new Koa();

app.use(json())
app.use(logger())
app.use(bodyParser())


app.use(registerModules([
  // place modules here
  // later will be improving this by using the dynamic module resolvation [default exportation needed in each module entry]
  ManagementModule
]).routes())

// Generic error handling middleware.
app.use(errorHandler);

// Application error logging.
app.on('error', console.error);

app.listen(PORT, () => {
  console.log(`Koa service is currently running on port ${PORT}`)
})

export default app;