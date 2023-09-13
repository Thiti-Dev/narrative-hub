import { inject, injectable } from "inversify";
import { ManagementService } from "./managements.service.mjs";
import { DefineRoute } from "../../core/modulization/decorators/define-route.mjs";
import { RequestMethod } from "../../core/shared/enums/common.mjs";
import { Context, Next } from "koa";

@injectable()
export class ManangementController{
    constructor(@inject(ManagementService) private someSortOfService:ManagementService){
        console.log("ManangementController has been initiated")
    }

    @DefineRoute("/",RequestMethod.GET)
    public indexRoute(ctx:Context,next:Next){
        ctx.body = { message: 'User profile!' }; 
    }
}