import { inject, injectable } from "inversify";
import { DefineRoute } from "../../core/modulization/decorators/define-route.mjs";
import { RequestMethod } from "../../core/shared/enums/common.mjs";
import { Context, Next } from "koa";
import { WriteupService } from "./writeups.service.mjs";
import { CreateWriteupBodyDTO } from "./dtos/bodies/create-writeup.dto.mjs";


@injectable()
export class WriteupController{
    constructor(@inject(WriteupService) private writeupService:WriteupService){
        console.log("WriteupController has been initiated")
    }


    @DefineRoute("/create",RequestMethod.POST,{validationBlueprint:CreateWriteupBodyDTO,authorizationNeeded:true,uploadBlueprint:{multi:false,fieldName:'file',allowedMimes:['image/jpeg','image/jpg','image/png'],fileSizeInMB:5}})
    public async createWriteup(ctx:Context,_next:Next){
        const writeup = await this.writeupService.createWriteup(ctx.request.dto as CreateWriteupBodyDTO,ctx.state.user.id,ctx.file)
        ctx.status = 201;
        ctx.body = { data: writeup }; 
    }

    @DefineRoute("/:id/detail",RequestMethod.GET)
    public async viewWriteup(ctx:Context,_next:Next){
        const writeup = await this.writeupService.viewWriteup(ctx.params.id)
        if(!writeup){
            return ctx.status = 404
        }
        ctx.body = { data: writeup }; 
    }


    @DefineRoute("/list",RequestMethod.GET)
    public async list(ctx:Context,_next:Next){
        const writeups = await this.writeupService.listWriteups()
        ctx.body = { data: writeups }; 
    }
}