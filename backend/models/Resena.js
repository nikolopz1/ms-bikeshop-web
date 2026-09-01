const mongoose = require('mongoose');

const resenaSchema = new mongoose.Schema({
    producto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Producto',
        required: true
    },
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    calificacion: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    titulo: {
        type: String,
        required: true
    },
    comentario: {
        type: String,
        required: true
    },
    imagenes: [String],
    utiles: {
        type: Number,
        default: 0
    },
    estado: {
        type: String,
        enum: ['pendiente', 'aprobada', 'rechazada'],
        default: 'pendiente'
    },
    respuestaAdmin: String,
    criadaEn: {
        type: Date,
        default: Date.now
    },
    actualizadaEn: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Resena', resenaSchema);