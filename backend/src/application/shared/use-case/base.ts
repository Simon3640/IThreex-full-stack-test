import { UseCaseResult } from "./use-case-result";

export interface BaseUseCase<Input, Output> {
    setLocale(locale: string): void;
    execute(input: Input): Promise<UseCaseResult<Output>>;
}