import { RequestMethod } from "../../shared/enums/common.mjs";
import { IRouteDefinitionOption, IRouteDescriptionMetadata } from "../interfaces.mjs";

export function DefineRoute(path: string, method: RequestMethod,config?:IRouteDefinitionOption) {
    return function (target: any, methodName: string, descriptor: PropertyDescriptor) {
      Reflect.defineMetadata('route-description', {method,path,config} as IRouteDescriptionMetadata, target, methodName);
    };
  }
  