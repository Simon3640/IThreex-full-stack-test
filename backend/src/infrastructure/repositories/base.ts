import { IBaseRepository } from "../../application/contracts/repositories/base";
import { PrismaClient } from "../database/generated/client";


export class PrismaRepositoryBase<TCreate, TUpdate, TDomain, TFilter>
    implements IBaseRepository<TCreate, TUpdate, TDomain, TFilter> {
    protected prisma: PrismaClient;
    protected modelName: keyof PrismaClient;

    constructor(modelName: keyof PrismaClient) {
        this.prisma = new PrismaClient();
        this.modelName = modelName;
    }
    async findAll(payload?: TFilter): Promise<TDomain[]> {
        // Valores por defecto
        let skip = 0;
        let take = 10;
        let filters: any = {};

        if (payload && typeof payload === 'object') {
            // Extraer skip y limit y convertir a número si vienen como string
            const { skip: s, limit: l, ...rest } = payload as any;

            if (s !== undefined) skip = Number(s);
            if (l !== undefined) take = Number(l);

            filters = rest;
        }

        const query: any = {
            skip,
            take,
        };

        if (Object.keys(filters).length > 0) {
            query.where = filters;
        }

        return (await (this.prisma[this.modelName] as any).findMany(query)) as TDomain[];
    }

    async count(payload?: TFilter | undefined): Promise<number> {
        let query = {};
        if (payload && Object.keys(payload).length > 0) {
            query = { where: { ...payload } };
        }
        return (await (this.prisma[this.modelName] as any).count(query)) as number;
    }

}