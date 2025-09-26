const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 3000;

// --- Middlewares ---
app.use(cors());
app.use(express.json()); 

// --- CONEXIÓN A LA BASE DE DATOS 'InnovaBank' ---
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456', // Tu contraseña
    database: 'InnovaBank'
});

db.connect(err => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
        return;
    }
    console.log('Conectado exitosamente a la base de datos: InnovaBank');
});


// --- RUTAS DE CONSULTA ---

app.get('/api/usuarios', (req, res) => {
    const sql = 'SELECT id_usuario, nombre, apellido_paterno, correo, id_rol FROM Usuario';
    db.query(sql, (err, results) => {
        if (err) { return res.status(500).send(err); }
        res.json(results);
    });
});

app.get('/api/clientes/:clienteId/cuentas', (req, res) => {
    const clienteId = req.params.clienteId;
    const sql = 'SELECT * FROM Cuenta WHERE id_cliente = ?';
    db.query(sql, [clienteId], (err, results) => {
        if (err) { return res.status(500).send(err); }
        res.json(results);
    });
});

app.get('/api/cuentas/:cuentaId/movimientos', (req, res) => {
    const cuentaId = req.params.cuentaId;
    const sql = 'SELECT * FROM Movimiento WHERE id_cuenta = ?';
    db.query(sql, [cuentaId], (err, results) => {
        if (err) { return res.status(500).send(err); }
        res.json(results);
    });
});

app.get('/api/cuentas/:cuentaId/transferencias', (req, res) => {
    const cuentaId = req.params.cuentaId;
    const sql = 'SELECT * FROM Transferencia WHERE id_cuenta_origen = ? OR id_cuenta_destino = ?';
    db.query(sql, [cuentaId, cuentaId], (err, results) => {
        if (err) { return res.status(500).send(err); }
        res.json(results);
    });
});

app.get('/api/cuentas/:cuentaId/tarjetas', (req, res) => {
    const cuentaId = req.params.cuentaId;
    const sql = 'SELECT * FROM Tarjeta WHERE id_cuenta = ?';
    db.query(sql, [cuentaId], (err, results) => {
        if (err) { return res.status(500).send(err); }
        res.json(results);
    });
});

// --- RUTA PARA EL LOGIN ---

app.post('/login', (req, res) => {
    const { email, password } = req.body;

   
    const sql = 'SELECT id_usuario, id_rol FROM Usuario WHERE correo = ? AND contraseña = ?';
    
    db.query(sql, [email, password], (err, results) => {
        if (err) {
            console.error('Error en la consulta de login:', err);
            return res.status(500).json({ status: 'error', message: 'Error en el servidor' });
        }

        if (results.length > 0) {
            // Si se encontró un usuario, la autenticación es exitosa
            const user = results[0];
            res.json({
                status: 'success',
                message: 'Login exitoso',
                id_rol: user.id_rol // Enviamos el id_rol de vuelta a Angular
            });
        } else {
            // Si no se encontró un usuario, las credenciales son incorrectas
            res.status(401).json({ status: 'error', message: 'Correo o contraseña incorrectos' });
        }
    });
});


// --- Iniciar el servidor ---
app.listen(port, () => {
    console.log(`Servidor API de InnovaBank corriendo en http://localhost:${port}`);
});