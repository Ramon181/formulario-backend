const express = require("express");
const cors = require("cors");
const mysql = require('mysql');
require("dotenv")

const server = express();
const port = 8080;

const db = mysql.createPool({
  user: process.env.DB_USER, // e.g. 'my-db-user'
  password: process.env.DB_PASS, // e.g. 'my-db-password'
  database: process.env.DB_NAME, // e.g. 'my-database'
  socketPath: `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`,
});


server.use(cors());
server.use(express.json())

server.post('/', (req, res) => {
    const { name, country } = req.body;
    if (!name || !country) {
      return res.status(400).json({ message: 'Faltan campos requeridos' });
    }
    const query = 'INSERT INTO formulario (name, country) VALUES (?, ?)';
    db.query(query, [name, country], (err, result) => {
      if (err) {
        console.error('Error al guardar los datos del formulario:', err);
        return res.status(500).json({ message: 'Error del servidor' });
      }
      return res.status(200).json({ message: 'Datos del formulario guardados correctamente' });
    });
  });

  server.get('/', (req, res) => {
    const query = 'SELECT * FROM formulario';
    db.query(query, (err, result) => {
      if (err) {
        console.error('Error al obtener el formulario:', err);
        return res.status(500).json({ message: 'Error del servidor' });
      }
      return res.status(200).json(result);
    });
  });

  server.delete('/form/:id', (req, res) => {
    const userId = req.params.id;
    
    const query = 'DELETE FROM formulario WHERE id = ?';
    db.query(query, [userId], (err, result) => {
      if (err) {
        console.error('Error al borrar el formulario:', err);
        return res.status(500).json({ message: 'Error del servidor' });
      }
      
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'formulario no encontrado' });
      }
      
      return res.status(200).json({ message: 'formulario borrado exitosamente' });
    });
  });



server.listen(port, () => {
  console.log(`Servidor backend escuchando en el puerto ${port}`);
});
