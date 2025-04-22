import * as dotenv from "dotenv";
import DatabaseType from "./databaseType";

dotenv.config();

export default class DatabaseConfig {
    DB_TYPE: DatabaseType = "mysql";
    DB_HOST: string = process.env.DB_HOST || "localhost";
    DB_PORT = Number(process.env.DB_PORT) || 3306;
    DB_USER: string = process.env.DB_USER || "root";
    DB_PASSWORD: string = process.env.DB_PASSWORD || "Admin369*";
    DB_NAME: string = process.env.DB_NAME || "webapp_db";
    DB_LOGGING: boolean = process.env.DB_LOGGING === "true" ? true : false;
}
