const mongoose = require('mongoose');

const envioSchema = new mongoose.Schema({
    numeroPedido: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pedido',
        required: true
    },
    numeroSeguimiento: {
        type: String,
        unique: true
    },
    transportista: {
        type: String,
        enum: ['servientrega', 'dhl', 'coordinadora', 'colmas', 'otro'],
        required: true
    },
    direccion: {
        calle: String,
        ciudad: String,
        departamento: String,
        codigoPostal: String
    },
    estado: {
        type: String,
        enum: ['pendiente', 'recogida', 'transito', 'entregado', 'devuelto'],
        default: 'pendiente'
    },
    costoEnvio: Number,
    pesoEstimado: Number,
    fechaSalida: Date,
    fechaEntregaEstimada: Date,
    fechaEntregaReal: Date,
    latitud: Number,
    longitud: Number,
    actualizaciones: [
        {
            estado: String,
            fecha: Date,
            ubicacion: String,
            observacion: String
        }
    ],
    criadoEn: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Envio', envioSchema);