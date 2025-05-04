
# Entraga API Backend

## Descripción

Este proyecto es la API para la entrega final de la carrera Fullstack de Coderhouse, comisión #70360. API para sistema de adopciones de mascotas. Proporciona endpoints para gestionar usuarios, mascotas, adopciones y autenticación. Está diseñado para ser usado en un entorno de producción y desarrollo, con herramientas como Mocha para pruebas y Swagger para documentación.

## Versiones

- **Versión**: 1.0.0
- **Tecnologías**: Node.js, Express, MongoDB.

## Endpoints

### API de Adopciones

- **POST** `/api/adoptions`: Crear una nueva adopción (Solo para administradores registrados)
- **GET** `/api/adoptions`: Obtener todas las adopciones (Solo para administradores registrados)
- **GET** `/api/adoptions/{id}`: Obtener una adopción por ID (Solo para administradores registrados)
- **DELETE** `/api/adoptions/{id}`: Eliminar una adopción por ID (Solo para administradores registrados)

### API de Autenticación

- **POST** `/api/auth/login`: Inicio de sesión de usuario
- **POST** `/api/auth/register`: Registro de nuevo usuario

### API de Mascotas

- **POST** `/api/pets/register`: Registrar una nueva mascota (Solo para administradores registrados)
- **POST** `/api/pets/mocks/{amount}`: Crear mascotas de prueba
- **GET** `/api/pets/`: Obtener todas las mascotas
- **GET** `/api/pets/{id}`: Obtener una mascota por ID
- **DELETE** `/api/pets/{id}`: Eliminar una mascota por ID (Solo para administradores registrados)
- **PUT** `/api/pets/{id}`: Actualizar una mascota por ID (Solo para administradores registrados)

### API de Usuarios

- **POST** `/api/users/mocks/{amount}`: Crear usuarios de prueba
- **GET** `/api/users/`: Obtener todos los usuarios (Solo para administradores registrados)
- **GET** `/api/users/{id}`: Obtener un usuario por ID (Solo para administradores registrados)
- **DELETE** `/api/users/{id}`: Eliminar un usuario por ID (Solo administradores y usuarios registrados)
- **PUT** `/api/users/restore-pass`: Restablecer la contraseña de un usuario (Solo para usuarios registrados)
- **PUT** `/api/users/update`: Actualizar un usuario (Solo para usuarios registrados)


##  Logger

Este proyecto utiliza [Winston](https://github.com/winstonjs/winston) para gestionar los logs. Los errores se registran tanto en consola como en un archivo local:

```
logs/errors.log
```

Configuración personalizada incluye:

- Formato con color
- Timestamp con formato `DD-MM-YYYY HH:mm:ss`
- Archivo persistente para errores (`errors.log`)


## Scripts de Proyecto

- **test**: Ejecutar todas las pruebas usando Mocha.

  ```bash
  npm run test
  ```

- **test:watch**: Ejecutar pruebas con supervisión de cambios.

  ```bash
  npm run test:watch
  ```

- **dev**: Iniciar el servidor en modo desarrollo con el archivo de entorno `.env`.

  ```bash
  npm run dev
  ```

- **debug7**: Iniciar el servidor en modo desarrollo con supervisión de cambios y archivo `.env`.

  ```bash
  npm run debug7
  ```


  ```bash
  npm run prod
  ```

- **start**: Iniciar el servidor en producción.

  ```bash
  npm run start
  ```

## Dependencias

- **bcrypt**: Para encriptar contraseñas.
- **cookie-parser**: Para analizar cookies.
- **dotenv**: Para  cargar variables de entorno.
- **express**: Framework web para Node.js.
- **express-compression**: Para comprimir respuestas HTTP.
- **jsonwebtoken**: Para manejar JSON Web Tokens (JWT).
- **mongoose**: ORM para MongoDB.
- **swagger-jsdoc**: Para generar documentación de Swagger.
- **swagger-ui-express**: Para mostrar la documentación de Swagger en una interfaz web.
- **winston**: Para logging.
- **zod**: Para validaciones de entrada.


### Dependencias de Desarrollo

- **@faker-js/faker**: Para generar datos falsos.
- **chai**: Librería de aserciones para pruebas.
- **mocha**: Framework de pruebas.
- **supertest**: Para realizar pruebas HTTP.

## Cómo Iniciar

1. Clona este repositorio.
2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Ejecuta el servidor en desarrollo:

   ```bash
   npm run dev
   ```

## 📘 Documentación Swagger

La documentación de la API está disponible en:

```
http://localhost:3000/api/docs/
```

---


## Licencia

Este proyecto está bajo la Licencia ISC.
