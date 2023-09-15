import type { MikroORM as MikroORMBase } from "@mikro-orm/core";
import { PostgreSqlDriver } from "@mikro-orm/postgresql";
import { injectable } from "inversify";

@injectable()
export class MikroORM{
    private instance:MikroORMBase<PostgreSqlDriver>
    constructor(){
        console.log('MikroOrma instance has been successfully initiated')
    }

    public initialize(orm: MikroORMBase<PostgreSqlDriver>){
        this.instance = orm
        console.log('MikroOrma instance has been successfully initialized and ready to be used')
    }

    public getEntityManager(){
        return this.instance.em
    }
}