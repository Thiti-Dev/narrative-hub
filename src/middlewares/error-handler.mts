import { StatusCodes } from 'http-status-codes';
import Koa from 'koa'
import type {Context,Next} from 'koa'

export default async (ctx: Koa.Context, next: Next) => {
    try {
      await next();
    } catch (error:any) {

      if(error.code === '23505'){
        // handler for constraint check
        ctx.status = 400
        ctx.body = {error_type: "constraint_check",message: error.detail}
        
      }else{
        ctx.status = error.statusCode || error.status || StatusCodes.INTERNAL_SERVER_ERROR;
        error.status = ctx.status;
        ctx.body = { error };
        ctx.app.emit('error', error, ctx);
      }
    }
  }