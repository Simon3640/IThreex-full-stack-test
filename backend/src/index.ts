import AppSettings from "./application/shared/settings/app-settings"
import { PrismaDatabase } from "./infraestructure/database";
import { LoggerProvider } from "./infraestructure/providers/logger-provider";

export function initializeInfrastructure(): void{
    AppSettings.init({
        ENVIRONMENT: process.env.ENVIRONMENT,
        DEFAULT_LANGUAGE: process.env.DEFAULT_LANGUAGE,
        APPLICATION_NAME: process.env.APPLICATION_NAME,
        APPLICATION_VERSION: process.env.APPLICATION_VERSION,
        APPLICATION_DESCRIPTION: process.env.APPLICATION_DESCRIPTION,
        APPLICATION_PORT: process.env.APPLICATION_PORT,
        ENABLE_LOG: process.env.ENABLE_LOG,
        DEBUG_LOG: process.env.DEBUG_LOG,
        DB_HOST: process.env.DB_HOST,
        DB_PORT: process.env.DB_PORT,
        DB_NAME: process.env.DB_NAME,
        DB_USER: process.env.DB_USER,
        DB_PASSWORD: process.env.DB_PASSWORD,
        DB_SSL: process.env.DB_SSL,
    });

    PrismaDatabase.setup(new LoggerProvider());


}