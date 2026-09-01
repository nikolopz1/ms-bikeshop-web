const express = require('express');
const router = express.Router();
const Envio = require('../models/Envio');

// Obtener estado de envío
router.get('/:numeroSeguimiento', async (req, res) => {
    try {
        const envio = await Envio.findOne({ numeroSeguimiento: req.params.numeroSeguimiento });
        if (!envio) {
            return res.status(404).json({ error: 'Envío no encontrado' });
        }
        res.json(envio);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Actualizar estado de envío
router.put('/:id', async (req, res) => {
    try {
        const { estado, ubicacion, observacion } = req.body;
        const envio = await Envio.findById(req.params.id);
        
        envio.actualizaciones.push({
            estado,
            fecha: new Date(),
            ubicacion,
            observacion
        });
        envio.estado = estado;
        
        await envio.save();
        res.json(envio);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;