# Backend de Formularios

Este es el backend de una aplicación de formularios que permite almacenar y administrar datos de usuarios en una base de datos. Proporciona una API RESTful para realizar operaciones CRUD (Crear, Leer, Eliminar) en los formularios.


## Tecnologías utilizadas

1 - Node.js: Entorno de ejecución de JavaScript del  lado del servidor.

2 - Express.js: Framework de Node.js para construir aplicaciones web y APIs.

3 - MySQL: Sistema de gestión de base de datos relacional.

4 - CORS: Middleware para habilitar el acceso a recursos desde dominios diferentes.


## Configuración

Para instalar y ejecutar la aplicación de formularios, sigue los siguientes pasos:

- Clona este repositorio en tu máquina local.

- Asegúrate de tener Node.js y MySQL instalados en tu sistema.

- Crea una base de datos en MySQL para almacenar los datos de los formularios.

- Instala las dependencias del proyecto ejecutando el siguiente comando en la terminal: npm install

- Ejecuta el comando npm start para iniciar el servidor backend.
## API Endpoints

El backend proporciona los siguientes endpoints para realizar operaciones en los formularios:

- GET /form: Obtiene todos los formularios.
- POST /form: Crea un nuevo formulario.
- DELETE /form/:id: Elimina un formulario por su ID.
