import { Router, Request, Response } from "express";
import { EmployeeFilter } from "../../../../domain/models/employee";
import { GetAllEmployeeUseCase, CountEmployeeUseCase } from "../../../../application/modules/employee";
import { LoggerProvider } from "../../../providers/logger-provider";
import { PrismaEmployeeRepository } from "../../../repositories/employee";

export const employeeRouter = Router(

);

employeeRouter.get("/", async (req: Request, res: Response) => {
    const payload: EmployeeFilter = req.query;
    let useCaseResult = await new GetAllEmployeeUseCase(new LoggerProvider(), new PrismaEmployeeRepository()).execute(payload);
    // Falto request resolver y validación de errores
    res.json(useCaseResult);
})

employeeRouter.get("/count", async (req: Request, res: Response) => {
    const payload: EmployeeFilter = req.query;
    let useCaseResult = await new CountEmployeeUseCase(new LoggerProvider(), new PrismaEmployeeRepository()).execute(payload);
    // Falto request resolver y validación de errores
    res.json(useCaseResult);
});