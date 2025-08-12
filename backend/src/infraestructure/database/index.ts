import { PrismaClient } from "./generated/client";
import { initDb } from "./init-db"; // nuestro script de migraciones/seed
import type { ILoggerProvider } from "../../application/contracts/logger-provider";

export class PrismaDatabase {
    private static instance: PrismaClient;

    static async setup(logger: ILoggerProvider) {
        if (!process.env.DATABASE_URL) {
            throw new Error("DATABASE_URL no está definida en el archivo .env");
        }

        logger.info("Conectando a la base de datos...");

        try {
            this.instance = new PrismaClient();
            await this.instance.$connect();
            logger.info("Conexión a base de datos establecida");

            // Ejecuta migraciones y seed
            await initDb();
        } catch (err) {
            err instanceof Error ? logger.error("Error conectando a base de datos", err) :
            process.exit(1);
        }
    }

    static getClient(): PrismaClient {
        if (!this.instance) {
            throw new Error("Base de datos no inicializada. Llama a setup() primero.");
        }
        return this.instance;
    }
}