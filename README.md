# 📦 Orders Microservice

<p align="center">
  <img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" />
</p>

<p align="center">
  Microservicio encargado de la gestión de Órdenes, construido con <a href="http://nestjs.com/" target="blank">NestJS</a> y <a href="https://www.prisma.io/" target="blank">Prisma ORM</a> con PostgreSQL.
</p>

---

## 📋 Requisitos Previos

Asegúrate de tener instalados en tu sistema local:

- **Node.js** (v18 o superior)
- **pnpm** (Gestor de paquetes recomendado para este proyecto)
- **PostgreSQL** (instalado localmente o vía Docker para la base de datos)

## 🛠️ Instalación

1. Navega al directorio del microservicio:
   ```bash
   cd orders-microservice
   ```

2. Instala las dependencias usando `pnpm`:
   ```bash
   pnpm install
   ```

## ⚙️ Configuración de Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto. Este microservicio necesita conectarse a una base de datos PostgreSQL. Usa esta estructura de referencia:

```env
# Puerto interno del microservicio de órdenes
PORT=3002

# Conexión al microservicio de Productos (para validaciones y consultas cruzadas)
PRODUCTS_MICROSERVICES_HOST=localhost
PRODUCTS_MICROSERVICES_PORT=3000

# URL de conexión a la Base de Datos PostgreSQL
DATABASE_URL="postgresql://postgres:123456@localhost:5432/ordersdb?schema=public"
```

## 🗄️ Base de Datos (Prisma)

El proyecto utiliza Prisma como ORM. Asegúrate de generar el cliente y correr las migraciones si es necesario:

```bash
# Generar el cliente de Prisma
npx prisma generate

# Aplicar las migraciones a la base de datos para sincronizar el esquema
npx prisma migrate dev
```

## ▶️ Ejecución del Proyecto

```bash
# Modo desarrollo
pnpm start

# Modo desarrollo (con hot-reload, RECOMENDADO)
pnpm start:dev

# Modo producción
pnpm start:prod
```

## 🧪 Testing

```bash
# Pruebas unitarias
pnpm test

# Pruebas end-to-end
pnpm test:e2e

# Cobertura de código
pnpm test:cov
```
