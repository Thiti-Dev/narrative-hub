import { inject, injectable } from "inversify";
import { MikroORM } from "../../databases/mikrorm/instance.mjs";
import { Owner } from "./entities/owner.entity.js";
import { CreateOwnerBodyDTO } from "./dtos/bodies/create-owner.dto.mjs";

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
}