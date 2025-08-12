import { PrismaClient } from "./generated/client";
import { defaultEmployees } from "../../domain/defaults/employee"; 

const prisma = new PrismaClient();

export async function initDb() {
  console.log("🚀 Iniciando migraciones y datos por defecto...");

  try {
    const count = await prisma.employee.count();
    if (count === 0) {
      console.log("📦 Insertando empleados por defecto...");
      await prisma.employee.createMany({
        data: defaultEmployees.map(emp => ({
          ...emp,
          antiquity: String(emp.antiquity),
        })),
      });
      console.log("✅ Empleados insertados");
    } else {
      console.log("⚡ Empleados ya existentes, no se insertan");
    }

    console.log("✅ Base de datos inicializada correctamente");
  } catch (error) {
    console.error("❌ Error inicializando DB:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}