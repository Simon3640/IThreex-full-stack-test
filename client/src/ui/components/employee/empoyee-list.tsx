
import { useEffect } from "react";
import { useEmployeeStore } from "../../../infraestructure/store/employee";

export const EmployeeList = () => {
  const { employees, fetchEmployees } = useEmployeeStore();

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  return (
    <table border={1} cellPadding={5}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>telefono</th>
          <th>Área</th>
        </tr>
      </thead>
      <tbody>
        {employees.map(emp => (
          <tr key={emp.id}>
            <td>{emp.id}</td>
            <td>{emp.name}</td>
            <td>{emp.phone}</td>
            <td>{emp.area}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};