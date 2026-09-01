const express = require('express');
const router = express.Router();
const { autenticacion } = require('../middleware/autenticacion');
const Pago = require('../models/Pago');

// Crear pago
router.post('/', autenticacion, async (req, res) => {
    try {
        const { pedido, monto, metodoPago } = req.body;
        const pago = new Pago({
            pedido,
            usuario: req.usuario._id,
            monto,
            metodoPago
        });
        await pago.save();
        res.status(201).json(pago);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;