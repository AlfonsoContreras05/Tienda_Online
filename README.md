

## Tienda Online
"Tienda Online" es una aplicación web diseñada para gestionar un catálogo de productos, permitiendo a los usuarios buscar, filtrar, ordenar y ver detalles de los productos disponibles.

## Despliegue
<<<<<<< HEAD
El Back-End está desplegado en el siguiente enlace: [Mi Repertorio en Render](https://mi-repertorio.onrender.com)](https://tienda-online-ksl6.onrender.com).
=======
La aplicación está desplegada y accesible en el siguiente enlace: [Tienda](https://ptecnicatonline.netlify.app/).
>>>>>>> 5ab4c3346c7d9c307bff93899d84e769b500f61a

## Tecnologías Utilizadas
Este proyecto ha sido desarrollado utilizando las siguientes tecnologías:

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white) ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![Bootstrap](https://img.shields.io/badge/bootstrap-%238511FA.svg?style=for-the-badge&logo=bootstrap&logoColor=white) ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white) ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)![DOTENV](https://img.shields.io/badge/dotenv-0000?style=for-the-badge&logo=dotenv&logoColor=fff&color=b0a321) 

## Rutas
La aplicación incluye las siguientes rutas principales:

- `GET /products`: Muestra todos los productos con paginación.
- `GET /search`: Permite buscar productos por nombre.
- `GET /product/:id` : Muestra la información de un producto específico.

## Para la proxima actualizacion
- `POST /product`: Permite añadir un nuevo producto al catálogo.
- `PUT /product/:id`: Permite actualizar la información de un producto existente.
- `DELETE /product/:id`: Elimina un producto del catálogo.

## Instalación
Para ejecutar "Tienda Online" localmente, necesitas tener instalado Node.js y MySQL. Sigue estos pasos para la instalación:

1. Clona el repositorio:
    `git clone https://github.com/tu-usuario/tu-repositorio.git`

2. Navega al directorio del proyecto:
    `cd tu-repositorio`

3. Instala las dependencias:
    `npm install`

4. Configura las variables de entorno según tu configuración de MySQL en un archivo
    `.env`:

5. makefile

- DB_HOST=localhost
- DB_USER=tu_usuario
- DB_PASS=tu_contraseña
- DB_NAME=tu_base_de_datos

6. Inicia el servidor:
`npm start`

<<<<<<< HEAD
`El servidor debería estar corriendo y accesible en http://localhost:3000.`
=======
`El servidor debería estar corriendo y accesible en http://localhost:3000.`
>>>>>>> 5ab4c3346c7d9c307bff93899d84e769b500f61a
