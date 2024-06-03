// Importar las librerías necesarias
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const dotenv = require('dotenv');

// Cargar las variables de entorno desde el archivo .env
dotenv.config();

// Crear una instancia de la aplicación Express
const app = express();

// Middleware para permitir solicitudes desde diferentes dominios
app.use(cors());
// Middleware para parsear solicitudes JSON
app.use(express.json());

// Configuración de la conexión a la base de datos MySQL
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    connectTimeout: 10000 // Tiempo de espera en milisegundos
});

// Conectar a la base de datos y manejar errores
db.connect((err) => {
    if (err) {
        console.error('Error conectando a la base de datos:', err);
        return;
    }
    console.log('Conectado a la base de datos MySQL.');
});


// Obtener todos los productos con paginación
app.get('/products', (req, res) => {
    // Obtener el número de página y el límite de productos por página desde los parámetros de consulta
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    // Consulta SQL para obtener los productos con sus categorías
    const query = `
        SELECT p.id, p.name, p.url_image, p.price, p.discount, c.name as category
        FROM product p
        JOIN category c ON p.category = c.id
        LIMIT ?, ?
    `;
    // Ejecutar la consulta SQL
    db.query(query, [offset, limit], (err, results) => {
        if (err) {
            console.error('Error obteniendo los productos:', err);
            res.status(500).json({ error: 'Error interno del servidor' });
            return;
        }

        // Consulta SQL para contar el total de productos
        const countQuery = 'SELECT COUNT(*) as count FROM product';
        db.query(countQuery, (err, countResult) => {
            if (err) {
                console.error('Error contando los productos:', err);
                res.status(500).json({ error: 'Error interno del servidor' });
                return;
            }

            const totalItems = countResult[0].count;
            const totalPages = Math.ceil(totalItems / limit);

            // Enviar la respuesta con los productos y la información de paginación
            res.json({
                products: results,
                totalItems,
                totalPages,
                currentPage: page
            });
        });
    });
});

// Buscar productos por nombre
app.get('/search', (req, res) => {
    const { query } = req.query;
    const searchQuery = 'SELECT * FROM product WHERE name LIKE ?';
    // Ejecutar la consulta SQL con el término de búsqueda
    db.query(searchQuery, [`%${query}%`], (err, results) => {
        if (err) {
            console.error('Error buscando productos:', err);
            res.status(500).json({ error: 'Error interno del servidor' });
            return;
        }
        // Enviar la respuesta con los resultados de la búsqueda
        res.json(results);
    });
});

// Definir el puerto en el que correrá el servidor
const PORT = process.env.PORT || 3000;
// Iniciar el servidor y escuchar en el puerto definido
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
