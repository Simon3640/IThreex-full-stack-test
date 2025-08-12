import type { IBaseRepository } from "../contracts/repositories/base-repository";
import type { ResponseDTO } from "../dto/response-dto";

export class BaseService<TCreate, TUpdate, TDomain, TFilter> {
    // create(item: TCreate): Promise<TDomain>;
    // update(id: string, item: TUpdate): Promise<TDomain | null>;
    // findById(id: string): Promise<TDomain | null>;
    repository: IBaseRepository<TCreate, TUpdate, TDomain, TFilter>;
    constructor(repository: IBaseRepository<TCreate, TUpdate, TDomain, TFilter>) {
        this.repository = repository;
    }

    findAll(payload?: TFilter): Promise<ResponseDTO<TDomain[]>> {
        return this.repository.findAll(payload);
    }

    // delete(id: string): Promise<boolean>;
    count(payload?: TFilter): Promise<ResponseDTO<number>> {
        return this.repository.count(payload);
    }

}