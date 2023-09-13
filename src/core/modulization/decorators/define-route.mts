import { RequestMethod } from "../../shared/enums/common.mjs";
import { IRouteDescriptionMetadata } from "../interfaces.mjs";

export function DefineRoute(path: string, method: RequestMethod) {
    return function (target: any, methodName: string, descriptor: PropertyDescriptor) {
      Reflect.defineMetadata('route-description', {method,path} as IRouteDescriptionMetadata, target, methodName);
    };
  }
  