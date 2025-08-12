import { BaseRepository } from "./base";
import type { Employee, EmployeeFilter } from "../../domain/models/employee";

export class EmployeeRepository extends BaseRepository<Employee, Employee, Employee, EmployeeFilter> {
}