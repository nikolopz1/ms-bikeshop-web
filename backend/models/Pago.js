const mongoose = require('mongoose');

const pagoSchema = new mongoose.Schema({
    pedido: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pedido',
        required: true
    },
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    monto: {
        type: Number,
        required: true
    },
    moneda: {
        type: String,
        default: 'COP'
    },
    metodoPago: {
        type: String,
        enum: ['transferencia', 'nequi', 'daviplata', 'efectivo', 'stripe', 'paypal'],
        required: true
    },
    estado: {
        type: String,
        enum: ['pendiente', 'completado', 'fallido', 'reembolsado'],
        default: 'pendiente'
    },
    referencia: String,
    idTransaccion: String,
    comprobante: String,
    razonFallo: String,
    intentos: {
        type: Number,
        default: 0
    },
    fechaIntento: Date,
    fechaCompletado: Date,
    criadoEn: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Pago', pagoSchema);