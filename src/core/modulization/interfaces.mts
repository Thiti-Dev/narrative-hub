import {Container} from "inversify"
import { RequestMethod } from "../shared/enums/common.mjs";

type TControllerClass = { new(...args: any[]): any; };
type TServiceClass = { new(...args: any[]): any; };
export type TModuleClass = { new(...args: any[]): any; } & IModulizationProperty;

export interface IMoulizationProperty{
    moduleName: string;
    prefix?: string;
    controllers?: TControllerClass[];
    services?: TServiceClass[]
}

export interface IModulizationProperty {
    // (with-implements) Marking as Optional because these props would get initialized after using the class decorator
    controllers: any[]
    container: Container
    getContainer: () => Container
}
  
export interface IRouteDescriptionMetadata{
    path: string;
    method: RequestMethod
}