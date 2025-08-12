import { EmployeeFilter } from "../../../domain/models/employee";
import { ILoggerProvider } from "../../contracts/logger-provider";
import { IEmployeeRepository } from "../../contracts/repositories/employee";
import { Locale } from "../../shared/locales/app-messages";
import { LocaleTypeEnum } from "../../shared/locales/locale-type-enum";
import { MessageKeysDictionaryEnum } from "../../shared/locales/messages/keys";
import AppStatusEnum from "../../shared/status/application-status";
import { BaseUseCase } from "../../shared/use-case/base";
import { UseCaseResult } from "../../shared/use-case/use-case-result";

export class CountEmployeeUseCase implements BaseUseCase<EmployeeFilter, number> {
    AppMessages?: Locale;
    log: ILoggerProvider;
    repo: IEmployeeRepository;
    locale: LocaleTypeEnum;

    constructor(loggerProvider: ILoggerProvider, employeeRepository: IEmployeeRepository) {
        this.log = loggerProvider;
        this.repo = employeeRepository;
        this.locale = LocaleTypeEnum.EN; // Default locale
    }

    setLocale(locale: string): void {
        if (locale !== "") {
            this.locale = locale as LocaleTypeEnum;
        }
    }
    async execute(input: EmployeeFilter): Promise<UseCaseResult<number>> {
        let result = new UseCaseResult<number>();
        this.AppMessages = new Locale(this.locale);
        try {
            let data = await this.repo.count(input);
            if (data === 0) {
                result.setError(AppStatusEnum.NotFound, this.AppMessages.get(this.locale, MessageKeysDictionaryEnum.EMPLOYEES_NOT_FOUND), "");
            }
            result.setData(AppStatusEnum.Success, data, this.AppMessages.get(this.locale, MessageKeysDictionaryEnum.EMPLOYEES_FOUND));
        } catch (error) {
            result.setError(
                AppStatusEnum.InternalError,
                this.AppMessages.get(this.locale, MessageKeysDictionaryEnum.EMPLOYEE_ERROR),
                (error as Error).message
            );
        }
        return result;

    }
}