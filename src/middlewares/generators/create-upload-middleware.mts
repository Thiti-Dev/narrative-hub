import {Middleware} from "koa"
import { IRouteDefinitionOption } from "../../core/modulization/interfaces.mjs"
import { Instance } from "@koa/multer"


export function createUploadMiddleware(instance:Instance,blueprint: IRouteDefinitionOption['uploadBlueprint']): Middleware{
    return blueprint?.multi ? instance.fields(blueprint.multiFieldsData) : instance.single(blueprint?.fieldName)
}