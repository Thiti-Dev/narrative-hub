import { inject, injectable } from "inversify";
import { ManagementService } from "./managements.service.mjs";
import { DefineRoute } from "../../core/modulization/decorators/define-route.mjs";
import { RequestMethod } from "../../core/shared/enums/common.mjs";
import { Context, Next } from "koa";
import { LoginBodyDTO } from "./dtos/bodies/login-body.dto.mjs";
import { CreateOwnerBodyDTO } from "./dtos/bodies/create-owner.dto.mjs";

@injectable()
export class ManangementController{
    constructor(@inject(ManagementService) private managementService:ManagementService){
        console.log("ManangementController has been initiated")
    }

    @DefineRoute("/owners",RequestMethod.GET)
    public async getOwners(ctx:Context,_next:Next){
        const owners = await this.managementService.getOwnerList()
        ctx.body = { data: owners }; 
    }

    @DefineRoute("/create-owner",RequestMethod.POST,{validationBlueprint:CreateOwnerBodyDTO})
    public async createOwner(ctx:Context,_next:Next){
        const owners = await this.managementService.createOwner(ctx.request.dto as CreateOwnerBodyDTO)
        ctx.body = { data: owners }; 
    }
}