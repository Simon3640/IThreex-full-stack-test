import { EmployeeCreate, Employee, EmployeeUpdate, EmployeeFilter } from "../../../domain/models/employee";
import { IEmployeeRepository } from "../../contracts/repositories/Employee";

export class MockEmployeeRepository implements IEmployeeRepository {
    findAll(payload?: EmployeeFilter | undefined): Promise<Employee[]> {
        // Mock implementation returning an unic element array
        return Promise.resolve([
            {
                id: BigInt(1),
                name: "John Doe",
                area: "Engineering",
                antiquity: 5,
                phone: "123-456-7890",
            },
        ]);

    }}
