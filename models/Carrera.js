const mongoose = require('mongoose');

const carreraSchema = new mongoose.Schema({
  nombre: { type: String, required: true }
});

module.exports = mongoose.model('Carrera', carreraSchema);