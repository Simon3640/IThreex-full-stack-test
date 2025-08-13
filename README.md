# IThreex-full-stack-test
# Prueba Técnica – Backend + Frontend

Este proyecto es una solución a la prueba técnica propuesta, que consiste en:

- **Backend (Node.js + Express)**:
  - API REST para obtener un listado de empleados.
  - Datos provenientes de una base de datos (MongoDB o PostgreSQL).
- **Frontend (React)**:
  - Listar empleados organizados por área.
  - Mostrar cantidad total por área.
  - Ver detalle de un empleado al hacer clic.

---

## Enfoque de Arquitectura

Para el backend se utiliza **Arquitectura Hexagonal (Ports & Adapters)** con **TypeScript**.  
El objetivo de implementar esta arquitectura no es por la complejidad del proyecto, sino para **demostrar habilidades de abstracción y desacoplamiento**, asegurando que la lógica de negocio sea independiente de:
- El framework de API (en este caso, Express.js).
- El motor de base de datos.
- El cliente que consuma la API.

---

## Estructura de Carpetas

backend/
│
├── src/
│   ├── domain/                        # Núcleo de negocio (no depende de Express ni DB)
│   │   ├── models/                    # Entidades de dominio (Empleado)
│   │   ├── defaults/                  # Valores por defecto o constantes
│   │
│   ├── application/                   # Casos de uso y orquestación
│   │   ├── dto/                       # Objetos de transferencia de datos
│   │   ├── contracts/                 # Interfaces para repositorios y servicios externos
│   │   └── use-cases/                 # Casos de uso (obtener empleados, filtrar por área)
│   │
│   ├── infrastructure/                # Implementaciones concretas de adaptadores
│   │   ├── api/                        # Implementación HTTP
│   │   │   ├── routes/                 # Definición de rutas
│   │   │   └── middleware/             # Middlewares (autenticación, logging)
│   │   ├── db/                         # Conexión e inicialización de la base de datos
│   │   │   ├── init_db/                 # Datos iniciales por defecto
│   │   │   ├── models/                  # Modelos del ORM
│   │   ├── repositories/               # Implementaciones de interfaces de acceso a datos
│   │   ├── providers/                   # Servicios externos o integraciones
│   │   └── config/                      # Variables de entorno, configuración global
│   │
│   └── index.ts                        # Punto de entrada de la aplicación
│
└── package.json
client/
│
├── src/
│   ├── domain/                        # Núcleo del dominio en el frontend
│   │   ├── models/                    # Entidades (Empleado, Área, etc.)
│   │   ├── defaults/                   # Valores por defecto
│   │   └── contracts/                  # Interfaces y tipos compartidos
│   │
│   ├── application/                    # Casos de uso y estado de la app
│   │   ├── dto/                        # Data Transfer Objects
│   │   ├── use-cases/                  # Casos de uso (organizar por área)
│   │   ├── services/                   # Orquestadores entre dominio e infraestructura
│   │   └── store/                      # Manejo de estado global (Redux, Zustand, Context)
│   │
│   ├── infrastructure/                 # Adaptadores y conexión a servicios externos
│   │   ├── api/                        # Llamadas HTTP al backend
│   │   ├── repositories/               # Implementaciones concretas para consumir datos
│   │   └── providers/                  # Configuración e inyección de dependencias
│   │
│   ├── ui/                             # Presentación y React puro
│   │   ├── components/                 # Componentes reutilizables
│   │   ├── pages/                      # Vistas completas
│   │   ├── hooks/                      # Hooks específicos de UI
│   │   └── styles/                     # Estilos globales y temas
│   │
│   ├── App.tsx                         # Estructura principal de la aplicación
│   └── main.tsx                        # Punto de arranque de React
│
└── package.json
packages/
│
└── shared-types
    └── src
        └── dtos/

package.json                            # Configuración de workspaces
docker/
│
└── db/
IDE/
│
└── launch.json
.env.backend                             # Variables de entorno
.env.frontend               # Variables de entorno para el frontend


---

## Breve Explicación de las Capas

### Backend

- **Domain**  
  Contiene el **núcleo de la aplicación**: entidades, interfaces de repositorios y reglas de negocio puras.  
  No conoce nada del framework, base de datos o API.

- **Application**  
  Coordina los **casos de uso** de la aplicación.  
  Usa los puertos definidos en `domain` para interactuar con la infraestructura.

- **Infrastructure**  
  Implementa los **adaptadores** necesarios para conectar el dominio con tecnologías externas:  
  - API (Express.js)
  - Base de datos (PostgreSQL)
  - Configuración y utilidades

### FrontEnd
- **Domain**  
    Define los modelos y tipos que usa la aplicación.
    Puede ser compartido con el backend si usas workspaces.

- **Application**  
    Implementa casos de uso en el cliente: cómo organizar, filtrar o transformar la información.
    Maneja el estado de la aplicación y coordina con infrastructure.

- **Infrastructure**  
    Implementa adaptadores para APIs, almacenamiento local o servicios externos.

- **UI**
    Todo lo que se renderiza: componentes, vistas y hooks de interacción.

## 🚀 Instalación y Ejecución

### 1. Clonar el repositorio
```bash
git clone https://github.com/simon3640/IThreex-full-stack-test.git
cd IThreex-full-stack-test
```

### 2. Configurar el entorno
Crea los archivos `.env.backend` y `.env.frontend` en la raíz del proyecto
con las variables de entorno necesarias.

.env.backend
```
DATABASE_URL="postgresql://fullstacktest:fullstacktest@db:5432/full_stack_test?schema=public"

```
.env.frontend
```
BACKEND_API_URL=http://localhost:3000/api
```

### 3. Levantar docker compose para el backend y la base de datos
```bash
docker compose -f docker/docker-compose.dev.yml up -d
```

### 4. Instalar dependencias y ejecutar el frontend
```bash
cd client
npm install
npm run dev
```

### 5. Acceder

- Backend: [http://localhost:3001/api](http://localhost:3001/api)
- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend Swagger: [http://localhost:3001/api-docs](http://localhost:3001/api-docs)






---