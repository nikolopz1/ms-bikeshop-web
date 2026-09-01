const mongoose = require('mongoose');

const pedidoSchema = new mongoose.Schema({
    numeroPedido: {
        type: String,
        unique: true,
        required: true
    },
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    items: [
        {
            producto: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Producto'
            },
            cantidad: Number,
            precio: Number,
            subtotal: Number
        }
    ],
    total: Number,
    descuento: {
        type: Number,
        default: 0
    },
    cupon: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cupon'
    },
    estado: {
        type: String,
        enum: ['pendiente', 'confirmado', 'enviado', 'entregado', 'cancelado'],
        default: 'pendiente'
    },
    metodoPago: {
        type: String,
        enum: ['transferencia', 'nequi', 'daviplata', 'efectivo', 'stripe'],
        required: true
    },
    estadoPago: {
        type: String,
        enum: ['pendiente', 'completado', 'fallido'],
        default: 'pendiente'
    },
    referenciaPago: String,
    direccionEntrega: {
        calle: String,
        numero: String,
        apartamento: String,
        ciudad: String,
        departamento: String,
        codigoPostal: String,
        instrucciones: String
    },
    envio: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Envio'
    },
    notasAdmin: String,
    criadoEn: {
        type: Date,
        default: Date.now
    },
    actualizadoEn: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Pedido', pedidoSchema);
