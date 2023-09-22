import { inject, injectable } from "inversify";
import { DefineRoute } from "../../core/modulization/decorators/define-route.mjs";
import { RequestMethod } from "../../core/shared/enums/common.mjs";
import { Context, Next } from "koa";
import { WriteupService } from "./writeups.service.mjs";


@injectable()
export class WriteupController{
    constructor(@inject(WriteupService) private writeupService:WriteupService){
        console.log("WriteupController has been initiated")
    }

}