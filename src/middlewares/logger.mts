import Koa from 'koa'
import type {Context,Next} from 'koa'

export default async (ctx:Context, next:Next) => {
    await next();
    const rt = ctx.response.get('X-Response-Time');
    console.log(`${ctx.method} ${ctx.url} - ${rt}`);
  }