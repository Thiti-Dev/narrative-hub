import { inject, injectable } from "inversify";
import { MikroORM } from "../../databases/mikrorm/instance.mjs";

import argon2 from 'argon2'
import * as jose from 'jose'
import { CreateWriteupBodyDTO } from "./dtos/bodies/create-writeup.dto.mjs";
import { Writeup } from "./entities/writeups.entity.js";
@injectable()
export class WriteupService{
    constructor(@inject(MikroORM) private orm:MikroORM){
        console.log("WriteupService constructor has been invoked")
    }

    public async createWriteup(dto: CreateWriteupBodyDTO,ownerID: number){
        const writeup = new Writeup(dto.topic,dto.contentData,ownerID)
        await this.orm.getEntityManager().persistAndFlush(writeup)
        return writeup
    }

    public async listWriteups(){
        const writeups = await this.orm.getEntityManager().find(Writeup,{},{populate:['owner']})
        return writeups
    }
}