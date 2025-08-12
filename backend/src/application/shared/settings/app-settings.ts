import { LocaleTypeEnum } from "../locales/locale-type-enum";


export default class AppSettings {
    static readonly DEV: string = "dev";
    static readonly TEST: string = "testing";
    static readonly PROD: string = "prod";
    static DefaultLanguage: LocaleTypeEnum = LocaleTypeEnum.EN_US;
    static Environment: string;
    
    static DefaultPageSize: number = 10;
    static MaxPageSize: number = 100;

    // Application

    static ApplicationName: string;
    static ApplicationVersion: string;
    static ApplicationDescription: string;
    static ApplicationPort: number;
    static EnableLog: boolean;
    static DebugLog: boolean;
    static DBHost: string;
    static DBPort: number;
    static DBName: string;
    static DBUser: string;
    static DBPassword: string;
    static DBSSL: boolean;

    
    static init(config: Record<string, any>): void {

        this.Environment = config.ENVIRONMENT || this.DEV;
        this.DefaultLanguage = config.DEFAULT_LANGUAGE || LocaleTypeEnum.EN_US;

        this.ApplicationName = config.APPLICATION_NAME || "IThreex Full Stack Test";
        this.ApplicationVersion = config.APPLICATION_VERSION || "1.0.0";
        this.ApplicationDescription = config.APPLICATION_DESCRIPTION || "A full stack test application for IThreex.";
        this.ApplicationPort = parseInt(config.APPLICATION_PORT, 10) || 3000;
        this.EnableLog = config.ENABLE_LOG === "true";
        this.DebugLog = config.DEBUG_LOG === "true";

        this.DBHost = config.DB_HOST || "localhost";
        this.DBPort = parseInt(config.DB_PORT, 10) || 5432;
        this.DBName = config.DB_NAME || "ithreex_test";
        this.DBUser = config.DB_USER || "ithreex_user";
        this.DBPassword = config.DB_PASSWORD || "ithreex_password";
        this.DBSSL = config.DB_SSL === "true";

    }
}

