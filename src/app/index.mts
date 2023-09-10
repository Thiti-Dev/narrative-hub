import Koa from 'koa';
import {StatusCodes} from 'http-status-codes';
import logger from 'koa-logger'
import json from 'koa-json'
import bodyParser from 'koa-bodyparser'
import errorHandler from '../middlewares/error-handler.mjs';

const PORT: number = 3000

const app: Koa = new Koa();

app.use(json())
app.use(logger())
app.use(bodyParser())

// Generic error handling middleware.
app.use(errorHandler);

// Initial route
app.use(async (ctx:Koa.Context) => {
  ctx.body = 'Hello world';
});

// Application error logging.
app.on('error', console.error);

app.listen(PORT, () => {
  console.log(`Koa service is currently running on port ${PORT}`)
})

export default app;