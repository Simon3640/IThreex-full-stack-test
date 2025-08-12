import AppStatusEnum from "../status/application-status";

export class UseCaseResult<T> {
    Data?: T;
    Error?: string | null;
    Headers: Record<string, string>;
    Details?: string;
    StatusCode: AppStatusEnum;
    Success: boolean;

    getHeaders(headers: Record<string, string>): Record<string, string> {
        return headers || {};
    }
    getStatusCode(statusCode: AppStatusEnum): AppStatusEnum {
        return statusCode
    }
    setStatusCode(statusCode: AppStatusEnum): void {
        this.StatusCode = statusCode;
    }
    setSuccess(success: boolean): void {
        this.StatusCode = success ? AppStatusEnum.Success : AppStatusEnum.InternalError;
        this.Success = success;
    }
    setOnlyData(data: T): void {
        this.Data = data;
    }
    setDetails(details: string): void {
        this.Details = details || "";
    }
    addHeader(key: string, value: string): void {
        if (!this.Headers) {
            this.Headers = {};
        }
        this.Headers[key] = value;
    }
    setData(statusCode: AppStatusEnum, data: T, details: string): void {
        this.StatusCode = statusCode;
        this.Data = data;
        this.Details = details || "";
        this.Success = statusCode === AppStatusEnum.Success;
        this.Error = null;
    }
    setError(statusCode: AppStatusEnum, error: string, details: string): void {
        this.StatusCode = statusCode;
        this.Error = error;
        this.Success = false;
    }
    toResultDTO(): Record<string, string> {
        let result = {
            statusCode: this.StatusCode.toString(),
            success: this.Success.toString(),
            details: this.Details || "",
        }
        if (this.Data) {
            result["data"] = JSON.stringify(this.Data);
        }
        if (this.Error) {
            result["error"] = this.Error;
        }
        return result;
    }
    isSuccess(): boolean {
        return this.Success;
    }
    getData(): T | undefined {
        return this.Data;
    }
    hasError(): boolean {
        return this.Error !== null && this.Error !== undefined;
    }
}