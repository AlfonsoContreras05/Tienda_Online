Tienda Online - Sistema de Gestión de Productos
Tienda Online es una aplicación de simulación de una tienda que permite a los usuarios buscar, filtrar, ordenar y ver detalles de productos. Además, los usuarios pueden navegar entre páginas de productos y ver detalles específicos de cada uno.

Despliegue
La aplicación está desplegada en Render y se puede acceder a ella a través del siguiente enlace:

Tienda Online en Render

Características
Búsqueda de Productos: Permite a los usuarios buscar productos por nombre.
Filtrado por Categoría: Filtra los productos por diferentes categorías.
Ordenar por Precio: Ordena los productos por precio, de menor a mayor o de mayor a menor.
Paginación: Navega entre diferentes páginas de productos.
Detalles del Producto: Muestra detalles específicos de cada producto en un modal.
Tecnologías Utilizadas
HTML5 JavaScript Bootstrap NodeJS Express.js 
 DOTENV

Configuración del Proyecto
Requisitos Previos
Asegúrate de tener instalado Node.js, npm y MySQL en tu sistema. Puedes descargarlos desde sus respectivos sitios web:

Node.js: https://nodejs.org/
MySQL: https://www.mysql.com/downloads/
Instalación
Clona este repositorio en tu máquina local:
git clone https://github.com/tu-usuario/tu-repositorio.git

Navega al directorio del proyecto:
cd tu-repositorio

Instala las dependencias necesarias:
npm install

Configura tu base de datos MySQL y ajusta las credenciales de conexión en el archivo .env.

Crea tu base de datos local o remota según tus preferencias y configura el archivo .env con las siguientes variables:

makefile
Copiar código
DB_HOST=localhost
DB_USER=tu_usuario
DB_PASS=tu_contraseña
DB_NAME=tu_base_de_datos
Inicia el servidor:

npm start

El servidor debería estar corriendo y accesible en http://localhost:3000.

Uso
Para buscar productos, utiliza el campo de búsqueda en la parte superior de la página.
Para filtrar productos por categoría, utiliza el menú desplegable de categorías.
Para ordenar productos por precio, utiliza el menú desplegable de ordenamiento.
Para navegar entre páginas, utiliza los botones de paginación en la parte inferior.
Para ver los detalles de un producto, haz clic en la tarjeta del producto.
