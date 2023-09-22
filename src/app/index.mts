import "reflect-metadata";

import dotenv from 'dotenv'
dotenv.config()

import Koa, { Context, Next } from 'koa';
import logger from 'koa-logger'
import json from 'koa-json'
import bodyParser from 'koa-bodyparser'
import cors from '@koa/cors'
import errorHandler from '../middlewares/error-handler.mjs';
import { registerModules } from "./module-registration.mjs";
import { ManagementModule } from "../modules/managements/managements.module.mjs";
import { RequestContext } from "@mikro-orm/core";
import { orm } from "../databases/mikrorm/mikrorm.config.mjs";
import { globalContainer } from "../global/inversify.container.mjs";
import { MikroORM } from "../databases/mikrorm/instance.mjs";
import { WriteupModule } from "../modules/writeups/writeups.module.mjs";

const PORT: number = 5000

const app: Koa = new Koa();

app.use(cors())
app.use(json())
app.use(logger())
app.use(bodyParser())

app.use((_ctx:Context,next:Next) => RequestContext.createAsync(orm.em,next))
globalContainer.get(MikroORM).initialize(orm) // registering loaded orm to the singleton-global-container


// Generic error handling middleware.
app.use(errorHandler);

const router = registerModules([
  // place modules here
  // later will be improving this by using the dynamic module resolvation [default exportation needed in each module entry]
  ManagementModule,
  WriteupModule
])

app.use(router.routes());
app.use(router.allowedMethods());

// Application error logging.
app.on('error', console.error);

app.listen(PORT, () => {
  console.log(`Koa service is currently running on port ${PORT}`)
})

export default app;