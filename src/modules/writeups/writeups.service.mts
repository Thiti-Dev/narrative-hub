import { inject, injectable } from "inversify";
import { MikroORM } from "../../databases/mikrorm/instance.mjs";

import argon2 from 'argon2'
import * as jose from 'jose'
@injectable()
export class WriteupService{
    constructor(@inject(MikroORM) private orm:MikroORM){
        console.log("WriteupService constructor has been invoked")
    }
}