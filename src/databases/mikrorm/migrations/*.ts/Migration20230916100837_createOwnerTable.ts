import { Migration } from '@mikro-orm/migrations';

export class Migration20230916100837_createOwnerTable extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "owner" ("id" serial primary key, "name" varchar(255) not null, "username" varchar(255) not null, "hashed_password" varchar(255) not null, "salt" varchar(255) not null, "created_at" timestamptz(0) not null default now(), "updated_at" timestamptz(0) null);');
    this.addSql('alter table "owner" add constraint "owner_username_unique" unique ("username");');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "owner" cascade;');
  }

}
