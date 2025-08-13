import { create } from "zustand";
import { Employee } from "../../domain/models/employee";
import { EmployeeService } from "../../application/services/employee";
import { EmployeeRepository } from "../repositories/employee";
import api from "../providers/http/api";


interface EmployeeState {
    employees: Employee[];
    setEmployees: (employees: Employee[]) => void;
    fetchEmployees: () => Promise<void>;
    total: number;
    skip: number;
    limit: number;
    area?: string;
    setSkip: (skip: number) => void;
    setLimit: (limit: number) => void;
    setAreaFilter: (area?: string) => void;
}

export const useEmployeeStore = create<EmployeeState>((set, get) => ({
    employees: [],
    total: 0,
    skip: 0,
    limit: 10,
    area: undefined,
    setSkip: (skip) => set({ skip }),
    setLimit: (limit) => set({ limit }),
    setAreaFilter: (area) => set({ area: area }),
    setEmployees: (employees) => set({ employees }),
    fetchEmployees: async () => {
        const {skip, limit, area} = get();
        const employeeService = new EmployeeService(new EmployeeRepository(api, "employee"));
        try {
            const response = await employeeService.findAll({ skip, limit, area });
            const total = await employeeService.count({area});
            if (response.Data) {
                set({ employees: response.Data, total: total.Data });
            } else {
                console.error("No employees found");
            }
        } catch (error) {
            console.error("Error fetching employees:", error);
        }
    },
}));