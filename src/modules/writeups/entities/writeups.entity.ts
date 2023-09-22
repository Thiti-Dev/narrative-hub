import { BeforeCreate, Entity, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core"
import { Owner } from "../../managements/entities/owner.entity.js"
import { Expose } from "class-transformer"
import { CONTENT_DATA_FIELD_NAME, COVER_IMAGE_KEY, CREATED_AT_FIELD_NAME, IS_PUBLISHED_FIELD_NAME, OWNER_ID_FIELD_NAME, UPDATED_AT_FIELD_NAME } from "../../../constants/field-names.mjs"

@Entity({tableName:'writeups'})
export class Writeup{
    constructor(topic:string,contentData:string,ownerID:number){
        this.topic = topic
        this.contentData = contentData
        this.owner = {id:ownerID} as Owner
    }

    @PrimaryKey()
    id!: number;

    @Property()
    topic!: string;

    @Property({name:COVER_IMAGE_KEY,serializedName:COVER_IMAGE_KEY,nullable:true})
    coverImageKey?: string

    @Property({name: CONTENT_DATA_FIELD_NAME,serializedName:CONTENT_DATA_FIELD_NAME})
    contentData!: string;

    @Property({name: IS_PUBLISHED_FIELD_NAME,serializedName:IS_PUBLISHED_FIELD_NAME,default: false})
    isPublished?: boolean;

    @Property({name: OWNER_ID_FIELD_NAME,serializedName:OWNER_ID_FIELD_NAME,persist:false}) // either ownerID or owner should be false persisted
    ownerID?: number

    @ManyToOne({
        entity: () => Owner,
        joinColumn: OWNER_ID_FIELD_NAME, // the exposed key -> db
        referenceColumnName: 'id',
        persist: true,
    })
    owner!: Owner

    @Property({name:CREATED_AT_FIELD_NAME,serializedName:CREATED_AT_FIELD_NAME,onCreate: () => new Date(),defaultRaw:'NOW()'})
    createdAt?: Date = new Date();
  
    @Property({name:UPDATED_AT_FIELD_NAME,serializedName:UPDATED_AT_FIELD_NAME, onUpdate: () => new Date(),nullable:true })
    updatedAt?: Date = new Date();
  
}