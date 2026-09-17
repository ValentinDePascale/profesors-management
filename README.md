# Gestión de Profesores

Sistema de gestión de profesores, materias y licencias.

## Tech Stack

- **Backend**: Node.js + TypeScript + Express
- **Database**: PostgreSQL + Prisma ORM
- **Testing**: Vitest
- **Validation**: Zod

## Instalación

```bash
cd backend
pnpm install
```

## Configuración

1. Configura la BD en `.env`:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/gestion_profesores"
```

2. Genera Prisma:
```bash
pnpm prisma generate
pnpm prisma migrate dev
```

## Desarrollo

```bash
# Dev server
pnpm dev

# Tests
pnpm test

# Tests con coverage
pnpm test -- --coverage

# Lint
pnpm lint

# Format
pnpm format
```

## Estructura

```
backend/src/
├── controllers/    # Lógica de requests
├── models/        # Acceso a datos (Prisma)
├── routes/        # Definición de rutas
├── schema/        # Validaciones (Zod)
├── middlewares/   # Validación y error handling
└── tests/         # Unit tests
```

## API Endpoints

- `GET/POST /api/profesors`
- `GET/POST /api/subjects`
- `GET/POST /api/licences`
- `GET/POST /api/license-type`

---

Made by Valentín De Pascale
