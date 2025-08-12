export interface ResponseDTO<T> {
    Data: T;
    Details: string;
    StatusCode: number;
    Success: boolean;
    Error: string | null;
}