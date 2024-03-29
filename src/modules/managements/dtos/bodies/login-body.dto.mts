import {
    IsNotEmpty, IsString
  } from 'class-validator';

export class LoginBodyDTO{

    @IsString()
    @IsNotEmpty()
    public username: string

    @IsString()
    @IsNotEmpty()
    public password: string
}