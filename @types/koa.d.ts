import * as Koa from "koa"

declare module "koa" {
    interface Request {
        dto?: unknown
    }
}