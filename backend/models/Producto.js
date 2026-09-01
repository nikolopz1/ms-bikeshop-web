const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    descripcion: String,
    precio: {
        type: Number,
        required: true
    },
    categoria: {
        type: String,
        enum: ['bicicletas', 'accesorios', 'repuestos', 'mantenimiento'],
        required: true
    },
    stock: {
        type: Number,
        default: 0
    },
    sku: {
        type: String,
        unique: true
    },
    imagen: String,
    imagenes: [String],
    emoji: String,
    especificaciones: mongoose.Schema.Types.Mixed,
    estado: {
        type: String,
        enum: ['disponible', 'agotado', 'descontinuado'],
        default: 'disponible'
    },
    vendidos: {
        type: Number,
        default: 0
    },
    calificacionPromedio: {
        type: Number,
        default: 0
    },
    totalResenas: {
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

module.exports = mongoose.model('Producto', productoSchema);