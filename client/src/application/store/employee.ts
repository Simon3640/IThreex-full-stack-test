import { create } from "zustand";
import { Employee } from "../../domain/models/employee";
import { getAllEmployees } from "../services/employee";

interface EmployeeState {
  employees: Employee[];
  loadEmployees: () => Promise<void>;
}

export const useEmployeeStore = create<EmployeeState>((set) => ({
  employees: [],
  loadEmployees: async () => {
    const data = await getAllEmployees();
    set({ employees: data.Data });
  }
}));