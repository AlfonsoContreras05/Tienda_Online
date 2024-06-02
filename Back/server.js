const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Configuración de la conexión a la base de datos
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    connectTimeout: 10000 // Tiempo de espera en milisegundos
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the MySQL database.');
});

// Obtener todos los productos con paginación
app.get('/products', (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const query = `
        SELECT p.id, p.name, p.url_image, p.price, p.discount, c.name as category
        FROM product p
        JOIN category c ON p.category = c.id
        LIMIT ?, ?
    `;
    db.query(query, [offset, limit], (err, results) => {
        if (err) {
            console.error('Error fetching products:', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }

        const countQuery = 'SELECT COUNT(*) as count FROM product';
        db.query(countQuery, (err, countResult) => {
            if (err) {
                console.error('Error counting products:', err);
                res.status(500).json({ error: 'Internal server error' });
                return;
            }

            const totalItems = countResult[0].count;
            const totalPages = Math.ceil(totalItems / limit);

            res.json({
                products: results,
                totalItems,
                totalPages,
                currentPage: page
            });
        });
    });
});

// Buscar productos
app.get('/search', (req, res) => {
    const { query } = req.query;
    const searchQuery = 'SELECT * FROM product WHERE name LIKE ?';
    db.query(searchQuery, [`%${query}%`], (err, results) => {
        if (err) {
            console.error('Error searching products:', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        res.json(results);
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
