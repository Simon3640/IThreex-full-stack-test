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
    async findAll(payload?: TFilter | undefined): Promise<TDomain[]> {
        let query = {};
        if (payload && Object.keys(payload).length > 0) {
            query = { where: { ...payload } };
        }
        return (await (this.prisma[this.modelName] as any).findMany(
            query
        )) as unknown as Promise<TDomain[]>;
    }

    async count(payload?: TFilter | undefined): Promise<number> {
        let query = {};
        if (payload && Object.keys(payload).length > 0) {
            query = { where: { ...payload } };
        }
        return (await (this.prisma[this.modelName] as any).count(query)) as number;
    }

}