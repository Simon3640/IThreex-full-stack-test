export class EmployeeBase {
    [optional: string]: unknown;
    name: string;
    area: string;
    antiquity: number;
    phone: string;
}

export class EmployeeCreate extends EmployeeBase {}

export class EmployeeUpdateBase {
    name?: string;
    area?: string;
    antiquity?: number;
    phone?: string;
}

export class EmployeeUpdate extends EmployeeUpdateBase {
    id: string;
}

export class Employee extends EmployeeBase {
    id: string;
}

export class EmployeeInDB extends Employee {
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}

