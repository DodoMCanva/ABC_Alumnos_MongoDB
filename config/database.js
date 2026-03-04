const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/alumnos_abc')
    .then(() => console.log('MongoDB conectado a alumnos_abc'))
    .catch(err => console.error('Error MongoDB:', err));