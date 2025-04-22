declare namespace NodeJS {
  interface ProcessEnv {
    API_PORT?: string;
    API_HOST?: string;
    API_URL?: string;
    API_VERSION?: string;

    DB_TYPE?: string;
    DB_PORT?: string;
    DB_HOST?: string;
    DB_USER?: string;
    DB_PASS?: string;
    DB_NAME?: string;
    AES_KEY?: string;

    // REDIS_DB?: string;
    // REDIS_PORT?: string;
    // REDIS_HOST?: string;
    // REDIS_PASS?: string;
  }
}
