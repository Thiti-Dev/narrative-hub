import { IModulizationProperty } from "../../core/modulization/interfaces.mjs";
import { Modulize } from "../../core/modulization/decorators/module.mjs";
import { WriteupController } from "./writeups.controller.mjs";
import { WriteupService } from "./writeups.service.mjs";


@Modulize({prefix: "/writeups",moduleName:"Writeup Module",controllers:[WriteupController],services:[WriteupService]})
export class WriteupModule{}