import { inject, injectable } from "inversify";
import { MikroORM } from "../../databases/mikrorm/instance.mjs";
import { Owner } from "./entities/owner.entity.js";
import { CreateOwnerBodyDTO } from "./dtos/bodies/create-owner.dto.mjs";
import { LoginBodyDTO } from "./dtos/bodies/login-body.dto.mjs";
import argon2 from 'argon2'
import * as jose from 'jose'
@injectable()
export class ManagementService{
    constructor(@inject(MikroORM) private orm:MikroORM){
        console.log("ManagementService constructor has been invoked")
    }

    public async getOwnerList(){
        const owners = await this.orm.getEntityManager().find(Owner,{})
        return owners
    }

    public async createOwner(dto:CreateOwnerBodyDTO){
        const owner = new Owner(dto.name,dto.username,dto.password)
        await this.orm.getEntityManager().persistAndFlush(owner)
        return owner
    }


    public async login(dto:LoginBodyDTO){
        const owner = await this.orm.getEntityManager().findOne(Owner,{username: dto.username})
        if(!owner) return {success:false,token:null}
        const saltBuffer = Buffer.from(owner.salt!);

        if(await argon2.verify(owner.hashedPassword, dto.password,{salt: saltBuffer})){

            var enc = new TextEncoder();
            const token = await new jose.SignJWT({
                username: owner.username,
                name:owner.name,
                id: owner.id,
            })
                .setProtectedHeader({ alg: "HS256" })
                .setIssuedAt()
                .setExpirationTime("7d")
                .sign(enc.encode(process.env.JWT_SECRET));

            return {success:true,token}
        }else return {success:false,token:null}
    }
}