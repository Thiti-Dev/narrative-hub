import { inject, injectable } from "inversify";
import { MikroORM } from "../../databases/mikrorm/instance.mjs";

import argon2 from 'argon2'
import * as jose from 'jose'
import { CreateWriteupBodyDTO } from "./dtos/bodies/create-writeup.dto.mjs";
import { Writeup } from "./entities/writeups.entity.js";
import { S3StorageService } from "../../desolated-services/injectables/s3-storage.service.mjs";
import type {File} from '@koa/multer'
@injectable()
export class WriteupService{
    constructor(@inject(MikroORM) private orm:MikroORM,@inject(S3StorageService) private storage:S3StorageService){
        console.log("WriteupService constructor has been invoked")
    }

    public async createWriteup(dto: CreateWriteupBodyDTO,ownerID: number,coverImageFile?: File){
        const writeup = new Writeup(dto.topic,dto.contentData,ownerID)
        if(coverImageFile){
            writeup.coverImageKey = await this.storage.uploadFile(coverImageFile,`${+new Date()}_${coverImageFile.originalname}`,'writeups',true)
        }
        await this.orm.getEntityManager().persistAndFlush(writeup)
        return writeup
    }

    public async viewWriteup(id: number){
        const writeup = await this.orm.getEntityManager().findOne(Writeup,{id},{populate:['owner']})
        if(writeup){
            writeup.coverImageURL = writeup.coverImageKey ? await this.storage.createPresignedURLFromKey(writeup.coverImageKey,3600) : null
        }
        return writeup
    }

    public async deleteWriteup(id: number){
        const writeup = await this.orm.getEntityManager().findOne(Writeup,{id})
        if(writeup){
            await this.orm.getEntityManager().removeAndFlush(writeup)
        }
        return writeup
    }

    public async listWriteups(){
        const writeups = await this.orm.getEntityManager().find(Writeup,{},{populate:['owner'],orderBy:{createdAt: 'DESC'}})
        return Promise.all(writeups.map(async(writeup) => {
            writeup.coverImageURL = writeup.coverImageKey ? await this.storage.createPresignedURLFromKey(writeup.coverImageKey,3600) : null
            return writeup
        }))
    }
}