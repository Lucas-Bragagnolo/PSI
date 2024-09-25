const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
app.use(cors()); // Permite CORS para todas las solicitudes

// Ruta para hacer proxy a la API
app.get('/api/cursos', async (req, res) => {
    try {
        const response = await fetch('https://psi.planbsistemas.com.ar/api_psi.php?accion=cursos');
        const data = await response.json();
        
        // Devolver los datos al cliente
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los datos de la API' });
    }
});

// Escuchar en el puerto 3001
app.listen(3001, () => {
    console.log('Servidor proxy corriendo en http://localhost:3001');
});