const express = require('express');
const router = express.Router();
const { autenticacion } = require('../middleware/autenticacion');
const Usuario = require('../models/Usuario');

// Obtener perfil
router.get('/perfil', autenticacion, async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.usuario._id).select('-contraseña');
        res.json(usuario);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Actualizar perfil
router.put('/perfil', autenticacion, async (req, res) => {
    try {
        const usuario = await Usuario.findByIdAndUpdate(
            req.usuario._id,
            req.body,
            { new: true }
        ).select('-contraseña');
        res.json(usuario);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;