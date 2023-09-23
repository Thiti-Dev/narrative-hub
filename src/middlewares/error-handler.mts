import { StatusCodes } from 'http-status-codes';
import Koa from 'koa'
import type {Context,Next} from 'koa'
import snakecaseKeys from 'snakecase-keys';

export default async (ctx: Koa.Context, next: Next) => {
    try {
      await next();
    } catch (error:any) {

      if(error.code === '23505'){
        // handler for constraint check
        ctx.status = 400
        ctx.body = snakecaseKeys({errorCode:4,errorType: "constraint_check",message: error.detail})
        
      }
      // Handling for multer
      else if(error.storageErrors){
        if((error.message as string).includes("Unsupported file type")){
          ctx.status = 400
          ctx.body = snakecaseKeys({errorCode: 2,errorType: "unsupported_filetype",message: error.message})
        }else{
          // only 2 cases exist if it is not the above it would be this one (file too large)
          ctx.status = 400
          ctx.body = snakecaseKeys({errorCode: 3,errorType: "file_too_large",message: error.message})
        }
      }
      else{
        ctx.status = error.statusCode || error.status || StatusCodes.INTERNAL_SERVER_ERROR;
        error.status = ctx.status;
        ctx.body = { error };
        ctx.app.emit('error', error, ctx);
      }
    }
  }