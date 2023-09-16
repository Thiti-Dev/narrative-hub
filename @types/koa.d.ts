import * as Koa from "koa"

declare module "koa" {
    interface Request {
        dto?: unknown
    }

    interface DefaultState{
        user: {
            username: string;
            name: string;
            id: number;
            iat: number;
            exp: number;
        }
    }
}