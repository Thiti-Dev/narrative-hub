import { Expose } from 'class-transformer';
import {
    IsNotEmpty, IsString
  } from 'class-validator';
import { RCON_PASSWORD } from '../../../../constants/field-names.mjs';

export class CreateOwnerBodyDTO{

    @IsString()
    @IsNotEmpty()
    public name: string

    @IsString()
    @IsNotEmpty()
    public username: string

    @IsString()
    @IsNotEmpty()
    public password: string

    @IsString()
    @IsNotEmpty()
    @Expose({name:RCON_PASSWORD})
    public rconPassword: string
}