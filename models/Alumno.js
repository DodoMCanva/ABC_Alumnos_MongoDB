const mongoose = require('mongoose');

const alumnoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  carrera: { type: mongoose.Schema.Types.ObjectId, ref: 'Carrera', default: null }
});

module.exports = mongoose.model('Alumno', alumnoSchema);