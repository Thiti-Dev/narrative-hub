import { MikroORM } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';

const orm = await MikroORM.init<PostgreSqlDriver>({
    entities: ['./dist/modules/**/entities/*.entity.js'],
    entitiesTs: ['./src/modules/**/entities/*.entity.ts'],
    dbName: 'nhub',
    type: 'postgresql',
    driver: PostgreSqlDriver,
    user:'postgres',
    password: 'postgres',
    migrations:{
      //emit: 'ts',
      path: './src/databases/mikrorm/migrations/*.js',
      pathTs: './src/databases/mikrorm/migrations/*.ts'
    },
  });

export {orm}
export default orm.config.getAll() // by doing this fixed the no driver found problem in particularly for migration-cli