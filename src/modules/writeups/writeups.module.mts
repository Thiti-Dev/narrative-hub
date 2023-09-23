import { IModulizationProperty } from "../../core/modulization/interfaces.mjs";
import { Modulize } from "../../core/modulization/decorators/module.mjs";
import { WriteupController } from "./writeups.controller.mjs";
import { WriteupService } from "./writeups.service.mjs";
import { S3StorageService } from "../../desolated-services/injectables/s3-storage.service.mjs";


@Modulize({prefix: "/writeups",moduleName:"Writeup Module",controllers:[WriteupController],services:[WriteupService,S3StorageService]})
export class WriteupModule{}