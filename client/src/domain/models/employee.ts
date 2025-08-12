export class Employee {
    id!: bigint | string;
    name!: string;
    area!: string;
    antiquity!: number;
    phone!: string;
    createdAt!: Date;
    updatedAt!: Date;
    deletedAt!: Date | null;
}

export class EmployeeFilter {
    area?: string;
    antiquity?: number;
    phone?: string;
}