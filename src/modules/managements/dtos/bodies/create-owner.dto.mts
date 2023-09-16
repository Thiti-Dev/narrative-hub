import {
    IsNotEmpty, IsString
  } from 'class-validator';

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
}