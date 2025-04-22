import {
    createLogger,
    Logger,
    LoggerOptions as WinstonLoggerOptions,
    format,
    transports as WinstonTransports,
    Logform
} from 'winston';
import 'winston-daily-rotate-file';

import {
    FormatLoggerOptions,
    TransportLoggerOptions,
    Environment,
    LoggerOptions
} from '../types/app/loggerFactoryTypes';

/**
* Clase LoggerFactory para crear instancias de logger utilizando Winston.
* Permite configurar diferentes formatos y transportes de log según el ambiente de ejecución.
*/
export default class LoggerFactory {

    /**
     * Crea un formato de log personalizado
     * @param formatOptions Opciones de formato
     * @returns Formato de log combinado
     */
    private createFormat(formatOptions: FormatLoggerOptions): Logform.Format {
        const formatArray: Logform.Format[] = [];
        if (formatOptions.colorize) {
            formatArray.push(format.colorize({ all: true }));
        }

        if (formatOptions.timestamp) {
            formatArray.push(format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }));
        }

        if (formatOptions.label) {
            formatArray.push(format.label({ label: formatOptions.label }));
        }

        if (formatOptions.json) {
            formatArray.push(format.json());
        }

        formatArray.push(
            format.printf(({ level, message, label, timestamp }) => {
                const text = label? `[${label}] [${level}]: ${message}` : `${timestamp} [${level}]: ${message}`;
                return text;
            })
        );

        return format.combine(...formatArray);
    }

    /**
     * Crea transportes de log
     * @param transportOptions Opciones de transporte
     * @param environment Ambiente de ejecución
     * @param loggerName Nombre del logger
     * @param loggerPath Ruta de los logs
     * @returns Arreglo de transportes
     */
    private createTransports(
        transportOptions: TransportLoggerOptions[],
        environment: Environment,
        loggerName: string,
        loggerPath: string
    ): (WinstonTransports.ConsoleTransportInstance | WinstonTransports.FileTransportInstance)[] {
        return transportOptions.map((transport) => {
            switch (transport.type) {
                case 'console':
                    return new WinstonTransports.Console({
                        level: transport.level || (environment === 'production' ? 'error' : 'info')
                    });
                case 'file':
                    return new WinstonTransports.File({
                        filename: transport.filename || `${loggerPath}/${loggerName}.log`,
                        level: transport.level || (environment === 'production' ? 'error' : 'info')
                    });
                default:
                    throw new Error(`Unknown transport type: ${JSON.stringify(transport)}`);
            }
        });
    }

    /**
     * Crea un logger de Winston
     * @param options Opciones de configuración del logger
     * @returns Instancia de logger
     */
    private createWinstonLogger(options: LoggerOptions): Logger {
        const { level, format: formatOptions, transports: transportOptions, environment, loggerName, loggerPath } = options;

        const loggerConfig: WinstonLoggerOptions = {
            level,
            format: this.createFormat(formatOptions),
            transports: this.createTransports(transportOptions, environment, loggerName, loggerPath)
        };

        return createLogger(loggerConfig);
    }

    /**
     * Crea un logger basado en el ambiente
     * @param options Opciones de configuración del logger
     * @returns Instancia de logger
     */
    createLogger(options: LoggerOptions): Logger {
        switch (options.environment) {
            case 'production':
                return this.createWinstonLogger({
                    ...options,
                    level: 'error'
                });
            case 'development':
            default:
                return this.createWinstonLogger(options);
        }
    }
}


export const loggerFactory = new LoggerFactory();