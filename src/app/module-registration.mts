import Router from 'koa-router'
import { IModulizationProperty, IRouteDescriptionMetadata, TModuleClass } from "../core/modulization/interfaces.mjs";
import { Middleware } from 'koa';
import { createValidationMiddleware } from '../middlewares/generators/create-validation-middleware.mjs';

// modules type compromised
export function registerModules(modules: TModuleClass[] | any[]){
    //registering module

    const router = new Router()
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
                        if(config?.validationBlueprint){
                            const middlewareCreation: Middleware = createValidationMiddleware(config.validationBlueprint)
                            middleWaresBuildUp.push(middlewareCreation) // push the validation-middleware to buildUp
                        }
                        router[method](modulePrefix+(path === "/" ? '' : path),...middleWaresBuildUp,containedController[methodName].bind(containedController) as Router.IMiddleware) // supportation for access like /index and /index/
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