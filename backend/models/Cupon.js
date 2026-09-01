const mongoose = require('mongoose');

const cuponSchema = new mongoose.Schema({
    codigo: {
        type: String,
        unique: true,
        required: true,
        uppercase: true
    },
    descripcion: String,
    tipo: {
        type: String,
        enum: ['porcentaje', 'cantidad'],
        required: true
    },
    valor: {
        type: Number,
        required: true
    },
    montoMinimo: {
        type: Number,
        default: 0
    },
    cantidadTotal: {
        type: Number,
        required: true
    },
    cantidadUsada: {
        type: Number,
        default: 0
    },
    fechaInicio: {
        type: Date,
        required: true
    },
    fechaVencimiento: {
        type: Date,
        required: true
    },
    estado: {
        type: String,
        enum: ['activo', 'inactivo', 'vencido'],
        default: 'activo'
    },
    criadoEn: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Cupon', cuponSchema);