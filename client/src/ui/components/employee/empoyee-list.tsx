import { useEffect, useState } from "react";
import { useEmployeeStore } from "../../../infraestructure/store/employee";
import type { Employee } from "../../../domain/models/employee";

const EmployeeDetailModal = ({
  employee,
  onClose,
}: {
  employee: Employee | null;
  onClose: () => void;
}) => {
  if (!employee) return null;

  return (
    <div
  onClick={onClose}
  className="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
>
  <div className="bg-white rounded p-6 max-w-md w-full relative shadow-lg" onClick={(e) => e.stopPropagation()}>
    <button
      onClick={onClose}
      className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 font-bold text-lg"
    >
      &times;
    </button>
    <h3 className="text-xl font-semibold mb-4">Empleado</h3>
    <p><strong>ID:</strong> {employee.id}</p>
    <p><strong>Nombre:</strong> {employee.name}</p>
    <p><strong>Teléfono:</strong> {employee.phone}</p>
    <p><strong>Área:</strong> {employee.area}</p>
    <p><strong>Fecha de creación:</strong> {new Date((employee as any).createdAt).toLocaleDateString()}</p>
    <p><strong>Fecha de actualización:</strong> {new Date((employee as any).updatedAt).toLocaleDateString()}</p>
  </div>
</div>
  );
};

export const EmployeeList = () => {
  const {
    employees,
    total,
    skip,
    limit,
    area,
    fetchEmployees,
    setSkip,
    setLimit,
    setAreaFilter,
  } = useEmployeeStore();

  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    fetchEmployees();
  }, [skip, limit, area, fetchEmployees]);

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Empleados</h2>

      {/* Filtros */}
      <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <label className="flex items-center gap-2 text-gray-700 font-medium">
          Filtrar por área:
          <select
            className="border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={area || ""}
            onChange={(e) => setAreaFilter(e.target.value || undefined)}
          >
            <option value="">Todas</option>
            <option value="Sales">Ventas</option>
            <option value="HR">Recursos Humanos</option>
            <option value="Engineering">IT</option>
            <option value="Marketing">Marketing</option>
          </select>
        </label>

        <label className="flex items-center gap-2 text-gray-700 font-medium">
          Registros por página:
          <select
            className="border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={limit}
            onChange={(e) => setLimit(Number(e.target.value))}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </label>
      </div>

      {/* Tabla */}
      <div className="overflow-x-auto rounded shadow border border-gray-200">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100 border-b border-gray-300">
            <tr>
              <th className="py-3 px-6 text-left text-gray-600 font-semibold text-sm">
                ID
              </th>
              <th className="py-3 px-6 text-left text-gray-600 font-semibold text-sm">
                Nombre
              </th>
              <th className="py-3 px-6 text-left text-gray-600 font-semibold text-sm">
                Teléfono
              </th>
              <th className="py-3 px-6 text-left text-gray-600 font-semibold text-sm">
                Área
              </th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm">
            {employees.map((emp, index) => (
              <tr
                key={emp.id}
                onClick={() => setSelectedEmployee(emp as any)}
                className={`cursor-pointer border-b border-gray-200 hover:bg-gray-50 transition-colors ${
                  index % 2 === 0 ? "bg-white" : "bg-blue-50"
                }`}
              >
                <td className="py-3 px-6">{emp.id}</td>
                <td className="py-3 px-6">{emp.name}</td>
                <td className="py-3 px-6">{emp.phone}</td>
                <td className="py-3 px-6">{emp.area}</td>
              </tr>
            ))}
            {employees.length === 0 && (
              <tr>
                <td colSpan={4} className="py-6 text-center text-gray-500">
                  No hay empleados para mostrar.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <p className="text-gray-600 text-sm">Total registros: {total}</p>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setSkip(Math.max(skip - limit, 0))}
            disabled={skip === 0}
            className={`px-3 py-1 rounded bg-white text-black disabled:bg-gray-300`}
          >
            Anterior
          </button>
          <span className="text-gray-700 text-sm">
            Página {Math.floor(skip / limit) + 1} de {totalPages}
          </span>
          <button
            onClick={() => setSkip(skip + limit)}
            disabled={skip + limit >= total}
            className={`px-3 py-1 rounded bg-white text-black disabled:bg-gray-300`}
          >
            Siguiente
          </button>
        </div>
      </div>

      {/* Modal detalle */}
      {selectedEmployee && (
        <EmployeeDetailModal
          employee={selectedEmployee}
          onClose={() => setSelectedEmployee(null)}
        />
      )}
    </div>
  );
};
