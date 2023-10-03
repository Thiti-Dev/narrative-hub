import { MikroORM } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';

// For third parties importing
import dotenv from 'dotenv'
dotenv.config()
// -------------------------

const orm = await MikroORM.init<PostgreSqlDriver>({
    entities: ['./dist/modules/**/entities/*.entity.js'],
    entitiesTs: ['./src/modules/**/entities/*.entity.ts'],
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT!),
    dbName: process.env.DB_NAME,
    type: 'postgresql',
    driver: PostgreSqlDriver,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    migrations:{
      //emit: 'ts',
      path: './src/databases/mikrorm/migrations/*.js',
      pathTs: './src/databases/mikrorm/migrations/*.ts',
      disableForeignKeys: false // violating the elephantSQL rule by trying to set the session_replication_role
    },
  });

export {orm}
export default orm.config.getAll() // by doing this fixed the no driver found problem in particularly for migration-cli