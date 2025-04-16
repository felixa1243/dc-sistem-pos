import typeorm from 'typeorm';
import { config } from './config.js';
import Member from '../entity/Member.js';
export const dataSource = new typeorm.DataSource({
    type: config.db.database_type,
    host: config.db.host,
    port: config.db.port,
    username: config.db.username,
    password: config.db.password,
    database: config.db.db_name,
    synchronize: true,
    entities: [Member]
})