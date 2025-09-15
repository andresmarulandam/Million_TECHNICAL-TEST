# 🏠 Million Property API - Technical Test

## 📋 Descripción

Backend API desarrollado en .NET 8 con MongoDB para la gestión de propiedades inmobiliarias. Implementa Clean Architecture y sigue las mejores prácticas de desarrollo.

## 🏗️ Estructura del Proyecto (Clean Architecture)

MILLION_TECHNICAL-TEST/
├── PropertyAPI/
│ ├── PropertyAPI.API/ # Capa de Presentación (Web API)
│ ├── PropertyAPI.Application/ # Lógica de Negocio y Casos de Uso
│ ├── PropertyAPI.Domain/ # Entidades y Modelos de Dominio
│ ├── PropertyAPI.Infrastructure/ # Acceso a Datos (MongoDB)
│ └── PropertyAPI.sln # Solución de Visual Studio
├── frontend/ # (Próximamente) React/Next.js App
├── database/ # Scripts y backups MongoDB
└── README.md

## 🚀 Tecnologías Utilizadas

- **.NET 8** - Framework principal
- **MongoDB** - Base de datos NoSQL
- **MongoDB.Driver** - Cliente oficial de MongoDB para .NET
- **Swagger/OpenAPI** - Documentación automática
- **Clean Architecture** - Patrón arquitectónico

## 📊 Modelo de Datos

```csharp
public class Property
{
    public string? Id { get; set; }
    public required string IdOwner { get; set; }
    public required string Name { get; set; }
    public required string Address { get; set; }
    public decimal Price { get; set; }
    public string? ImageUrl { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}

```

🔧 Instalación y Ejecución
Prerrequisitos
.NET 8 SDK
MongoDB (local o Atlas)

1. Clonar el repositorio
   bash
   git clone [<url-del-repositorio>](https://github.com/andresmarulandam/Million_TECHNICAL-TEST)
   cd MILLION-TECHNICAL-TEST

2. Ejecutar el backend
   bash
   cd Property.API
   dotnet restore
   dotnet build
   dotnet run --project PropertyAPI.API/

3. Acceder a la API
   API: http://localhost:5019

Swagger UI: http://localhost:5019/swagger

Health Check: http://localhost:5019/api/properties

## 🚀 Frontend - React + TypeScript + Vite

# 📋 Descripción

Frontend desarrollado en React 18 con TypeScript para visualización de propiedades inmobiliarias. Implementa componentes modulares, hooks personalizados y testing con Jest.

# 🏗️ Estructura del Frontend

text
frontend-react/
├── src/
│ ├── components/ # Componentes reutilizables
│ │ ├── PropertyCard.tsx
│ │ ├── PropertyFilters.tsx
│ │ ├── PropertyList.tsx
│ │ └── \*.css
│ ├── pages/ # Páginas de la aplicación
│ │ ├── HomePage.tsx
│ │ └── PropertyDetails.tsx
│ ├── hooks/ # Custom hooks
│ │ └── useProperties.ts
│ ├── services/ # Servicios API
│ │ ├── api.ts
│ │ └── imageService.ts
│ ├── types/ # Definiciones TypeScript
│ │ └── property.ts
│ ├── **tests**/ # Tests unitarios
│ └── App.tsx
├── public/
├── package.json
└── vite.config.ts

# 🛠️ Tecnologías Frontend

- React 18 - Biblioteca principal
- TypeScript - Tipado estático
- Vite - Build tool y dev server
- React Router - Navegación
- Jest + Testing Library - Testing

## 🔧 Instalación y Ejecución - Frontend

1. Instalar dependencias
   bash
   cd frontend-react
   npm install

2. Ejecutar en desarrollo
   bash
   npm run dev
   Aplicación: http://localhost:5173

3. Ejecutar tests
   bash
   npm test

# Funcionalidades Frontend

✅ Completadas

- Listado de propiedades con grid responsive
- Sistema de filtros (nombre, dirección, rango de precios)
- Detalles de propiedad con página individual
- Routing con React Router
- Manejo de estados con hooks personalizados
- Error handling y loading states
- Responsive design para móviles y desktop
- Testing de servicios y hooks

## Integración Completa

El frontend se conecta automáticamente al backend en http://localhost:5019/api. Asegúrate de que ambos servicios estén ejecutándose:

Iniciar Backend: dotnet run --project PropertyAPI.API/

Iniciar Frontend: npm run dev

Acceder: http://localhost:5173
