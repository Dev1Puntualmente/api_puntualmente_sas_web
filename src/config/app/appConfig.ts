import * as dotenv from "dotenv";

dotenv.config();

export default class AppConfig {
    API_PORT = Number(process.env.API_PORT) || 3000;
    API_HOST = process.env.API_HOST || "localhost";
    API_PREFIX = process.env.API_URL || "/api";
    API_VERSION = process.env.API_VERSION || "/v1";
    API_BASE_URL = `${this.API_HOST}:${this.API_PORT}${this.API_PREFIX}${this.API_VERSION}`;
}