import { Expose } from 'class-transformer';
import {
    IsNotEmpty, IsString
  } from 'class-validator';
import { CONTENT_DATA_FIELD_NAME } from '../../../../constants/field-names.mjs';

export class CreateWriteupBodyDTO{

    @IsString()
    @IsNotEmpty()
    public topic: string

    @IsString()
    @IsNotEmpty()
    @Expose({name:CONTENT_DATA_FIELD_NAME})
    public contentData: string
}