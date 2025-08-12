export class ApplicationError{
    Code: bigint;
    Context: string;
    Message: string;


    toError(): Error {
        return new Error(`${this.Context} - ${this.Message}`);
    }
}