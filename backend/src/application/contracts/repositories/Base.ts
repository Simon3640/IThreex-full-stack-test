export interface IBaseRepository<TCreate, TUpdate, TDomain, TFilter> {
    // create(item: TCreate): Promise<TDomain>;
    // update(id: string, item: TUpdate): Promise<TDomain | null>;
    // findById(id: string): Promise<TDomain | null>;
    findAll(payload?: TFilter): Promise<TDomain[]>;
    // delete(id: string): Promise<boolean>;
    count(payload?: TFilter): Promise<number>;
}