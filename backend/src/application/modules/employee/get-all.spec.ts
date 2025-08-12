import { Locale } from "../../shared/locales/app-messages";
import { LocaleTypeEnum } from "../../shared/locales/locale-type-enum";
import { MockLoggerProvider } from "../../shared/mocks/logger-provider.mock";
import { MockEmployeeRepository } from "../../shared/mocks/user-repository.mock";
import { GetAllEmployeeUseCase } from "./get-all";
// Jest globals are available in the test environment; no import needed.

const mockLoggerProvider = new MockLoggerProvider();
const mockEmployeeRepository = new MockEmployeeRepository();

const getAllEmployeeUseCase = new GetAllEmployeeUseCase(mockLoggerProvider, mockEmployeeRepository);
getAllEmployeeUseCase.setLocale(LocaleTypeEnum.EN);

describe("GetAllEmployeeUseCase", () => {
    it("should return a list of employees", async () => {
        const result = await getAllEmployeeUseCase.execute({});
        expect(result.isSuccess()).toBe(true);
        expect(result.data).toHaveLength(1);
        expect(result.data[0].name).toBe("John Doe");
    });

    it("should handle no employees found", async () => {
        const emptyRepo = new MockEmployeeRepository();
        emptyRepo.findAll = jest.fn().mockResolvedValue([]);
        const useCase = new GetAllEmployeeUseCase(mockLoggerProvider, emptyRepo);
        const result = await useCase.execute({});
        expect(result.isError()).toBe(true);
        expect(result.error?.message).toContain("No employees found");
    });

    it("should handle errors from the repository", async () => {
        const errorRepo = new MockEmployeeRepository();
        errorRepo.findAll = jest.fn().mockRejectedValue(new Error("Database error"));
        const useCase = new GetAllEmployeeUseCase(mockLoggerProvider, errorRepo);
        const result = await useCase.execute({});
        expect(result.isError()).toBe(true);
        expect(result.error?.message).toContain("Database error");
    });
});