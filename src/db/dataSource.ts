import * as path from "path";
import { DataSource, DataSourceOptions } from "typeorm";
import dbConfig from "../config/db/singleton";
import { fileExt } from "../config/app/environmentConfig";

const dataSource = new DataSource({
    type: dbConfig.DB_TYPE,
    host: dbConfig.DB_HOST,
    port: dbConfig.DB_PORT,
    username: dbConfig.DB_USER,
    password: dbConfig.DB_PASSWORD,
    database: dbConfig.DB_NAME,
    entities: [
        path.join(__dirname, `../modules/**/models/*.${fileExt}`),
    ],
    synchronize: true,
    logging: false,
} as DataSourceOptions);

export default dataSource;