const Carrera = require('../models/Carrera');
const Alumno = require('../models/Alumno');

class CarreraService {
    static async listar() {
        const carreras = await Carrera.find();
        const carrerasConConteo = await Promise.all(
            carreras.map(async (c) => {
                const total = await Alumno.countDocuments({ carrera: c._id });
                return {
                    id: c._id.toString(),    
                    nombre: c.nombre,
                    alumnos: total
                };
            })
        );
        return carrerasConConteo;
    }

    static async agregar(nombre) {
        const carrera = await Carrera.create({ nombre });
        return { id: carrera._id.toString(), nombre: carrera.nombre, alumnos: 0 };
    }

    static async asignarAlumno(alumnoId, carreraId) {
        const alumno = await Alumno.findById(alumnoId);
        if (!alumno) return false;

        alumno.carrera = carreraId; 
        await alumno.save();
        return true;
    }
}

module.exports = CarreraService;