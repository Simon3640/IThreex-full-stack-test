import type { Employee, EmployeeCreate, EmployeeFilter, EmployeeUpdate } from "../../domain/models/employee";
import type { IBaseRepository } from "../contracts/repositories/base-repository";
import { BaseService } from "./base";

export class EmployeeService extends BaseService<EmployeeCreate, EmployeeUpdate, Employee, EmployeeFilter> {
    constructor(repository: IBaseRepository<EmployeeCreate, EmployeeUpdate, Employee, EmployeeFilter>) {
        super(repository);
    }

    // Additional methods specific to EmployeeService can be added here
}