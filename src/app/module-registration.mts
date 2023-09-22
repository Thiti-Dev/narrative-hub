import Router, { IMiddleware } from 'koa-router'
import { IModulizationProperty, IRouteDescriptionMetadata, TModuleClass } from "../core/modulization/interfaces.mjs";
import { Middleware } from 'koa';
import { createValidationMiddleware } from '../middlewares/generators/create-validation-middleware.mjs';
import jwt from 'koa-jwt'
import multer from '@koa/multer'
import { createUploadMiddleware } from '../middlewares/generators/create-upload-middleware.mjs';


// modules type compromised
export function registerModules(modules: TModuleClass[] | any[]){
    //registering module

    const router = new Router()
    const upload = multer({storage: multer.memoryStorage()})
    const METHOD_OWN_KEY_EXCLUSION = ["constructor"]
    modules.forEach((module: TModuleClass) => {
        // complement each module
        console.log(`Module: ${module.name}`)
        const moduleContainer = (module.prototype as IModulizationProperty).getContainer()
        const controllerCount = (module.prototype.controllers || []).length
        if(controllerCount){
            //If controller found
            const modulePrefix = module.prototype.prefix || ''
            if(controllerCount === 1){
                // supportation for single controller
                const prototypeController = module.prototype.controllers[0] // extract out the first index of controller
                const containedController = moduleContainer.get(prototypeController) as any

                const methodNames =Reflect.ownKeys(prototypeController.prototype).filter(key => typeof prototypeController.prototype[key] === 'function' && !METHOD_OWN_KEY_EXCLUSION.includes(key.toString()))
                methodNames.forEach((methodName) => {
                    const descriptedMetadata: IRouteDescriptionMetadata = Reflect.getMetadata("route-description",containedController, methodName)
                    if(descriptedMetadata){
                        // if metadata found
                        const {method,path,config} = descriptedMetadata
                        let middleWaresBuildUp:Middleware[] = [];


                        config?.validationBlueprint && middleWaresBuildUp.push(createValidationMiddleware(config.validationBlueprint))

                        config?.authorizationNeeded && middleWaresBuildUp.push(jwt({secret: process.env.JWT_SECRET!})) // applying the jwt protected middleware to each route that has the authorization_needed flag
                                      
                        config?.uploadBlueprint && middleWaresBuildUp.push(createUploadMiddleware(upload,config?.uploadBlueprint))
                        
                        router[method](modulePrefix+(path === "/" ? '' : path),...middleWaresBuildUp as unknown as IMiddleware<any, {}>[],containedController[methodName].bind(containedController) as Router.IMiddleware) // supportation for access like /index and /index/ ------ Casting to unknown needed because having the @koa/multer imported will override some koa type declaration and make the middleware build up broken 3.0.2 / @types/koa__multer
                    }
                })
            }
            else{
                // impl will be needed later on if we need multiple-controller supportation. . .
            }
        }
    })

    return router
}