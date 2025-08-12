import type { Employee } from "../../domain/models/employee";
import type { ResponseDTO } from "./response-dto";

export interface EmployeeDTO extends ResponseDTO<Employee[]> {
}