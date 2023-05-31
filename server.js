const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

const server = express();
const port = 3001;

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "12345",
  database: "form",
});

db.connect((err) => {
  if (err) {
    console.error("Error al conectar a la base de datos:", err);
  } else {
    console.log("Conexión exitosa a la base de datos");
  }
});

server.use(cors());
server.use(express.json())

server.post('/form', (req, res) => {
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

  server.get('/form', (req, res) => {
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
