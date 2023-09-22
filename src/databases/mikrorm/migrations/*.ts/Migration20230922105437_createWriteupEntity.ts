import { Migration } from '@mikro-orm/migrations';

export class Migration20230922105437_createWriteupEntity extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "writeups" ("id" serial primary key, "topic" varchar(255) not null, "content_data" varchar(255) not null, "is_published" boolean not null default false, "owner_id" int not null, "created_at" timestamptz(0) not null default now(), "updated_at" timestamptz(0) null);');

    this.addSql('alter table "writeups" add constraint "writeups_owner_id_foreign" foreign key ("owner_id") references "owner" ("id") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "writeups" cascade;');
  }

}
