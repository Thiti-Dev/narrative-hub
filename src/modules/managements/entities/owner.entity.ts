import { BeforeCreate, Entity, PrimaryKey, Property } from "@mikro-orm/core";
import argon2 from 'argon2'
import crypto from 'crypto'

@Entity()
export class Owner{
    constructor(name:string,username:string,password:string){
        this.name = name
        this.hashedPassword = password // will be hashed later by the hook that handle before-creation flow
        this.username = username
    }


    @PrimaryKey()
    id!: number;

    @Property()
    name!: string;

    @Property({unique:true})
    username!: string;

    @Property({name: "hashed_password",hidden: true})
    hashedPassword!: string;

    @Property({hidden:true})
    salt?: string

    @Property({name:"created_at",onCreate: () => new Date(),defaultRaw:'NOW()'})
    createdAt?: Date = new Date();
  
    @Property({name:"updated_at", onUpdate: () => new Date(),nullable:true })
    updatedAt?: Date = new Date();


    @BeforeCreate()
    async hashingPhase(){
        const salt = crypto.randomBytes(16);
        const hashedPassword = await argon2.hash(this.hashedPassword,{salt})
        this.salt = salt.toString()
        this.hashedPassword = hashedPassword
    }
  
}