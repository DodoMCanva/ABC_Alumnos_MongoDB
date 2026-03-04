const Alumno = require('../models/Alumno');

class AlumnoService {

    static async listar() {
        const alumnos = await Alumno.find().populate('carrera', 'nombre');
        return alumnos.map(a => ({
            id: a._id.toString(),              // frontend expects id
            nombre: a.nombre,
            carrera: a.carrera ? a.carrera.nombre : null
        }));
    }

    static async agregar(nombre) {
        const alumno = await Alumno.create({ nombre });
        return {
            id: alumno._id.toString(),
            nombre: alumno.nombre,
            carrera: null
        };
    }

    static async borrar(id) {
        const result = await Alumno.findByIdAndDelete(id);
        return !!result;
    }

    static async actualizar(id, nombre) {
        const result = await Alumno.findByIdAndUpdate(id, { nombre });
        return !!result;
    }

    static async buscarPorId(id) {
        const alumno = await Alumno.findById(id).populate('carrera', 'nombre');
        if (!alumno) return null;
        return {
            id: alumno._id.toString(),
            nombre: alumno.nombre,
            carrera: alumno.carrera ? alumno.carrera.nombre : null
        };
    }
}

module.exports = AlumnoService;