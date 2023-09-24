import { Migration } from '@mikro-orm/migrations';

export class Migration20230924075724_changeConentDataToTextType extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "writeups" alter column "content_data" type text using ("content_data"::text);');
  }

  async down(): Promise<void> {
    this.addSql('alter table "writeups" alter column "content_data" type varchar(255) using ("content_data"::varchar(255));');
  }

}
