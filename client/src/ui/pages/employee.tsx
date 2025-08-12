import { EmployeeList } from "../components/employee/empoyee-list";

export const EmployeePage = () => {
  return (
    <div className="container mx-auto p-4 h-screen">
      <h1 className="text-2xl font-semibold mb-4 text-center">Lista de Empleados</h1>
      <EmployeeList />
    </div>
  );
};