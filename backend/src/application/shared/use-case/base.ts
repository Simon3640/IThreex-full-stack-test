export interface BaseUseCase<Input, Output> {
    setLocale(locale: string): void;
    execute(input: Input): Promise<Output>;
}