const express = require('express');
const router = express.Router();
const { autenticacion } = require('../middleware/autenticacion');
const Resena = require('../models/Resena');
const Producto = require('../models/Producto');

// Crear reseña
router.post('/', autenticacion, async (req, res) => {
    try {
        const { producto, calificacion, titulo, comentario } = req.body;
        const resena = new Resena({
            producto,
            usuario: req.usuario._id,
            calificacion,
            titulo,
            comentario
        });
        await resena.save();
        res.status(201).json(resena);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Obtener reseñas de un producto
router.get('/producto/:id', async (req, res) => {
    try {
        const resenas = await Resena.find({ producto: req.params.id, estado: 'aprobada' }).populate('usuario', 'nombre');
        res.json(resenas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;