const express = require('express');
const path = require('path');

require('./config/database');

const AlumnoService = require('./services/AlumnoService');
const CarreraService = require('./services/CarreraService');

const app = express();
const PORT = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


app.get('/api/alumnos', async (req, res) => {
    try {
        const alumnos = await AlumnoService.listar();
        res.json(alumnos);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/alumnos', async (req, res) => {
    try {
        const { nombre } = req.body;
        const alumno = await AlumnoService.agregar(nombre);
        res.json(alumno);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/api/alumnos/:id', async (req, res) => {
    try {
        const ok = await AlumnoService.borrar(req.params.id);
        res.json({ success: ok });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/api/alumnos/:id', async (req, res) => {
    try {
        const { nombre } = req.body;
        const ok = await AlumnoService.actualizar(req.params.id, nombre);
        res.json({ success: ok });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/carreras', async (req, res) => {
    try {
        const carreras = await CarreraService.listar();
        res.json(carreras);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/carreras', async (req, res) => {
    try {
        const { nombre } = req.body;
        const carrera = await CarreraService.agregar(nombre);
        res.json(carrera);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/api/carreras/:id', async (req, res) => {
    try {
        const ok = await CarreraService.borrar(req.params.id);
        res.json({ success: ok });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/api/carreras/:id', async (req, res) => {
    try {
        const { nombre } = req.body;
        const ok = await CarreraService.actualizar(req.params.id, nombre);
        res.json({ success: ok });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/asignar', async (req, res) => {
    try {
        const { alumnoId, carreraId } = req.body;
        const ok = await CarreraService.asignarAlumno(alumnoId, carreraId);
        res.json({ success: ok });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Servidor en http://localhost:${PORT}`);
});