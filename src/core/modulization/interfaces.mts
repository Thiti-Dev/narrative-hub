import {Container} from "inversify"
import { RequestMethod } from "../shared/enums/common.mjs";
export type TRegularClassType = { new(...args: any[]): any; }
type TControllerClass = TRegularClassType
type TServiceClass = TRegularClassType
export type TModuleClass = TRegularClassType & IModulizationProperty;

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
    config?: IRouteDefinitionOption;
    path: string;
    method: RequestMethod
}

export interface IRouteDefinitionOption{
    authorizationNeeded?: boolean,
    validationBlueprint?: TRegularClassType
}