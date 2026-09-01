const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const usuarioSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    contraseña: {
        type: String,
        required: true
    },
    telefono: String,
    direccion: String,
    ciudad: String,
    departamento: String,
    codigoPostal: String,
    rol: {
        type: String,
        enum: ['usuario', 'admin'],
        default: 'usuario'
    },
    estado: {
        type: String,
        enum: ['activo', 'inactivo', 'bloqueado'],
        default: 'activo'
    },
    foto: String,
    pedidosTotal: {
        type: Number,
        default: 0
    },
    gastoTotal: {
        type: Number,
        default: 0
    },
    criadoEn: {
        type: Date,
        default: Date.now
    },
    actualizadoEn: {
        type: Date,
        default: Date.now
    }
});

// Encriptar contraseña antes de guardar
usuarioSchema.pre('save', async function(next) {
    if (!this.isModified('contraseña')) return next();
    
    try {
        const salt = await bcrypt.genSalt(10);
        this.contraseña = await bcrypt.hash(this.contraseña, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// Método para comparar contraseñas
usuarioSchema.methods.compararContraseña = async function(contraseña) {
    return await bcrypt.compare(contraseña, this.contraseña);
};

module.exports = mongoose.model('Usuario', usuarioSchema);
