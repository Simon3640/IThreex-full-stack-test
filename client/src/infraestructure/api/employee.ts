import type { EmployeeDTO } from "../../application/dto/employee";
import type { EmployeeFilter } from "../../domain/models/employee";

export const fetchEmployees = async (filter?: EmployeeFilter): Promise<EmployeeDTO> => {
    const params: URLSearchParams = new URLSearchParams();
    if (filter) {
        if (filter.area) params.append('area', filter.area);
        if (filter.antiquity) params.append('antiquity', filter.antiquity.toString());
        if (filter.phone) params.append('phone', filter.phone);
    }

    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api/v1';

    const response = await fetch(`${API_BASE_URL}/employee?${params.toString()}`);
    if (!response.ok) {
        throw new Error('Failed to fetch employees');
    }
    const employees = await response.json();
    console.log('Fetched employees:', employees);
    return employees;
}