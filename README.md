# Frontend y Backend Management App

## Instalación y Configuración

### Frontend

1. Clonar el repositorio:

```sh
git clone https://github.com/JoseArroyave/front-management-app.git
```

2. Instalar dependencias:

```sh
cd front-management-app
npm i
```

3. Ejecutar el proyecto:

```sh
npm run start
```

### Backend

1. Clonar el repositorio:

```sh
git clone https://github.com/JoseArroyave/back-management-app.git
```

2. Instalar dependencias:

```sh
cd back-management-app
npm i
```

3. Crear un archivo `.env` en la raíz del proyecto con el siguiente contenido:

```env
APP_NAME=MANAGEMENT APP
PORT=3000
NODE_ENV=local

DB_CONNECTION=postgresql
DB_HOST=localhost
DB_PORT=5432
DB_DATABASE=imagine
DB_USERNAME=postgres
DB_PASSWORD=root

JWT_SECRET=<generar su propio JWT_SECRET>
HASH_SALT=10
```

4. Generar las migraciones:

```sh
npm run m:gen
```

5. Ejecutar las migraciones:

```sh
npm run m:run
```

6. Ejecutar el proyecto en modo desarrollo:

```sh
npm run start:dev
```

## Despliegue

El proyecto está desplegado en la siguiente dirección:
http://37.60.237.211/public/login
