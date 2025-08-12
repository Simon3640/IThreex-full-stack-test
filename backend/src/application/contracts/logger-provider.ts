export interface ILoggerProvider {
    error(message: string, err: Error): void;
    warn(message: string): void;
    info(message: string): void;
    debug(message: string): void;
    trace(message: string): void;
}