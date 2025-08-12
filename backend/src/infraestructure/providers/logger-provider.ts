import { ILoggerProvider } from "../../application/contracts/logger-provider";

export class LoggerProvider implements ILoggerProvider {
    error(message: string, err: Error): void {
        console.error(`Error: ${message}`, err);
    }
    warn(message: string): void {
        console.warn(`Warning: ${message}`);
    }
    info(message: string): void {
        console.info(`Info: ${message}`);
    }
    debug(message: string): void {
        console.debug(`Debug: ${message}`);
    }
    trace(message: string): void {
        console.trace(`Trace: ${message}`);
    }
}