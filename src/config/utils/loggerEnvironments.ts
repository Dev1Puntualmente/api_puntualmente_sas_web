import { LoggerOptions } from "../types/app/loggerFactoryTypes";

export const productionLogger: LoggerOptions = {
    level: 'debug',
    environment: 'production',
    loggerName: 'app',
    loggerPath: 'logs',
    format: {
        colorize: false,
        timestamp: true,
        json: true
    },
    transports: [
        {
            type: 'file',
            level: 'debug',
            filename: 'logs/logs.log'
        }
    ]
}

export const developmentLogger: LoggerOptions = {
    level: 'debug',
    environment: 'development',
    loggerName: 'app',
    loggerPath: 'logs',
    format: {
        colorize: true,
        timestamp: true,
        json: false
    },
    transports: [
        {
            type: 'console',
            level: 'debug',
        }
    ]
}