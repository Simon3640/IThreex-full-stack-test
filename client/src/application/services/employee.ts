import { fetchEmployees } from "../../infraestructure/api/employee";
import type { EmployeeDTO } from "../dto/employee";

export const getAllEmployees = async (): Promise<EmployeeDTO> => {
  const data = await fetchEmployees();
  return data;
};