import { create } from "zustand";
import { Employee } from "../../domain/models/employee";
import { EmployeeService } from "../../application/services/employee";
import { EmployeeRepository } from "../repositories/employee";
import api from "../providers/http/api";


interface EmployeeState {
    employees: Employee[];
    setEmployees: (employees: Employee[]) => void;
    fetchEmployees: () => Promise<void>;
}

export const useEmployeeStore = create<EmployeeState>((set) => ({
    employees: [],
    setEmployees: (employees) => set({ employees }),
    fetchEmployees: async () => {
        const employeeService = new EmployeeService(new EmployeeRepository(api, "employee"));
        try {
            const response = await employeeService.findAll();
            if (response.Data) {
                set({ employees: response.Data });
            } else {
                console.error("No employees found");
            }
        } catch (error) {
            console.error("Error fetching employees:", error);
        }
    },
}));