  export interface FormatLoggerOptions {
    colorize?: boolean;
    timestamp?: boolean;
    label?: string;
    json?: boolean;
  }
  
  export interface ConsoleTransportOptions {
    type: 'console';
    level?: string;
  }
  
  export interface FileTransportOptions {
    type: 'file';
    level?: string;
    filename?: string;
  }
  
  export type TransportLoggerOptions = ConsoleTransportOptions | FileTransportOptions;
  export type Environment = 'development' | 'production' | 'test';
  export type LogLevel = 'error' | 'warn' | 'info' | 'debug';
  
  export interface LoggerOptions {
    level: LogLevel;
    format: FormatLoggerOptions;
    transports: TransportLoggerOptions[];
    environment: Environment;
    loggerName: string;
    loggerPath: string;
  }