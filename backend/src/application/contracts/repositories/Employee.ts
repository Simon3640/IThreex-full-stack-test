import { EmployeeCreate, EmployeeUpdate, Employee, EmployeeFilter} from "../../../domain/models/employee";
import { IBaseRepository } from "./base";

export interface IEmployeeRepository extends IBaseRepository<EmployeeCreate, EmployeeUpdate, Employee, EmployeeFilter> {}
