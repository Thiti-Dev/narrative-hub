import { Migration } from '@mikro-orm/migrations';

export class Migration20230922173838_addCoverImageKeyToWriteup extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "writeups" add column "cover_image_key" varchar(255) null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "writeups" drop column "cover_image_key";');
  }

}
