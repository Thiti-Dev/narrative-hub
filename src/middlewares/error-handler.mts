import { StatusCodes } from 'http-status-codes';
import Koa from 'koa'
import type {Context,Next} from 'koa'

export default async (ctx: Koa.Context, next: () => Promise<any>) => {
    try {
      await next();
    } catch (error:any) {
      ctx.status = error.statusCode || error.status || StatusCodes.INTERNAL_SERVER_ERROR;
      error.status = ctx.status;
      ctx.body = { error };
      ctx.app.emit('error', error, ctx);
    }
  }