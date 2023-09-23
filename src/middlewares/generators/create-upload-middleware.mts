import {Middleware} from "koa"
import { IRouteDefinitionOption } from "../../core/modulization/interfaces.mjs"
import multer, { Instance } from "@koa/multer"
import { TMimeTypes } from "../../constants/types.mjs"
import { extname } from 'path';

export function createUploadMiddlewareFromInstance(instance:Instance,blueprint: IRouteDefinitionOption['uploadBlueprint']): Middleware{
    return blueprint?.multi ? instance.fields(blueprint.multiFieldsData) : instance.single(blueprint?.fieldName)
}


export function createUploadMiddleware(blueprint: NonNullable<IRouteDefinitionOption['uploadBlueprint']>): Middleware{
    const upload = multer({storage:multer.memoryStorage(),fileFilter(req, file, callback) {
        if(!blueprint.allowedMimes.includes(file.mimetype as TMimeTypes)){
            callback(new Error(`Unsupported file type ${extname(file.originalname)}`),false)
        }
        callback(null,true);
    },limits: {fileSize: blueprint.fileSizeInMB * 1024 * 1024 }})
    return blueprint?.multi ? upload.fields(blueprint.multiFieldsData) : upload.single(blueprint?.fieldName)
}