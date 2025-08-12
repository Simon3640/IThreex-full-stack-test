import { useEffect } from "react";
import { useEmployeeStore } from "../../../infraestructure/store/employee";

export const EmployeeList = () => {
  const {
    employees,
    total,
    skip,
    limit,
    areaFilter,
    fetchEmployees,
    setSkip,
    setLimit,
    setAreaFilter,
  } = useEmployeeStore();

  useEffect(() => {
    fetchEmployees();
  }, [skip, limit, areaFilter, fetchEmployees]);

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Empleados</h2>

      {/* Filtro por área */}
      <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <label className="flex items-center gap-2 text-gray-700 font-medium">
          Filtrar por área:
          <select
            className="border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={areaFilter || ""}
            onChange={(e) => setAreaFilter(e.target.value || undefined)}
          >
            <option value="">Todas</option>
            <option value="Ventas">Ventas</option>
            <option value="Recursos Humanos">Recursos Humanos</option>
            <option value="IT">IT</option>
          </select>
        </label>

        {/* Selector de cantidad por página */}
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
            {employees.map((emp) => (
              <tr
                key={emp.id}
                className={`border-b border-gray-200 hover:bg-gray-50 transition-colors ${Number(emp.id) % 2 === 0 ? "bg-white" : "bg-blue-50"}`}
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
            className="px-3 py-1 rounded bg-indigo-500 text-white disabled:bg-gray-300 disabled:cursor-not-allowed transition"
          >
            Anterior
          </button>
          <span className="text-gray-700 text-sm">
            Página {Math.floor(skip / limit) + 1} de {totalPages}
          </span>
          <button
            onClick={() => setSkip(skip + limit)}
            disabled={skip + limit >= total}
            className="px-3 py-1 rounded bg-indigo-500 text-white disabled:bg-gray-300 disabled:cursor-not-allowed transition"
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
};
