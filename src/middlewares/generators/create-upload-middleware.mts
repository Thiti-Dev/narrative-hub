import { Context, Middleware, Next } from "koa";
import type {Instance} from '@koa/multer'
import { IRouteDefinitionOption } from "../../core/modulization/interfaces.mjs";

export function createUploadMiddleware(multerInstance: Instance,blueprint: IRouteDefinitionOption['uploadBlueprint']): Middleware{
    return blueprint?.multi ? multerInstance.fields(blueprint.multiFieldsData) : multerInstance.single(blueprint?.fieldName)
}