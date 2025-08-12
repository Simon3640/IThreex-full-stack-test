import type { AxiosInstance } from "axios";
import type { IBaseRepository } from "../../application/contracts/repositories/base-repository";
import type { ResponseDTO } from "../../application/dto/response-dto";

export class BaseRepository<TCreate, TUpdate, TDomain, TFilter> implements IBaseRepository<TCreate, TUpdate, TDomain, TFilter> {
    protected http: AxiosInstance;
    protected endpoint: string;
    constructor(http: AxiosInstance, endpoint: string) {
        this.http = http;
        this.endpoint = endpoint;
    }

    async findAll(payload?: TFilter): Promise<ResponseDTO<TDomain[]>> {
        const response = await this.http.get<ResponseDTO<TDomain[]>>(this.endpoint, { params: payload });
        return response.data;
    }

    async count(payload?: TFilter): Promise<ResponseDTO<number>> {
        const response = await this.http.get<ResponseDTO<number>>(`${this.endpoint}/count`, { params: payload });
        return response.data;
    }
}
