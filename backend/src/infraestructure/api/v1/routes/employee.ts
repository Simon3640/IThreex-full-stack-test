import { Router, Request, Response } from "express";
import { EmployeeFilter } from "../../../../domain/models/employee";
import { GetAllEmployeeUseCase } from "../../../../application/modules/employee/get-all";
import { LoggerProvider } from "../../../providers/logger-provider";
import { PrismaEmployeeRepository } from "../../../repositories/employee";

export const employeeRouter = Router(

);

employeeRouter.get("/", async (req: Request, res: Response) => {
    const payload: EmployeeFilter = req.query;
    let useCaseResult = await new GetAllEmployeeUseCase(new LoggerProvider(), new PrismaEmployeeRepository()).execute(payload);
    res.json(useCaseResult);
})