import { Employee, EmployeeCreate, EmployeeFilter, EmployeeUpdate } from "../../domain/models/employee";
import { PrismaRepositoryBase } from "./base";

export class PrismaEmployeeRepository extends PrismaRepositoryBase<EmployeeCreate, EmployeeUpdate, Employee, EmployeeFilter> {
    constructor() {
        super("employee");
    }
}