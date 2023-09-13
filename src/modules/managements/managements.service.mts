import { injectable } from "inversify";

@injectable()
export class ManagementService{
    constructor(){
        console.log("ManagementService constructor has been invoked")
    }
}