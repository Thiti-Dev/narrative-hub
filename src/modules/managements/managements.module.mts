import { IModulizationProperty } from "../../core/modulization/interfaces.mjs";
import { Modulize } from "../../core/modulization/decorators/module.mjs";
import { ManangementController } from "./managements.controller.mjs";
import { ManagementService } from "./managements.service.mjs";

@Modulize({prefix: "/managements",moduleName:"Management Module",controllers:[ManangementController],services:[ManagementService]})
export class ManagementModule{}