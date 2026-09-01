const express = require('express');
const router = express.Router();
const Cupon = require('../models/Cupon');

// Validar cupón
router.post('/validar', async (req, res) => {
    try {
        const { codigo, monto } = req.body;
        const cupon = await Cupon.findOne({ codigo: codigo.toUpperCase() });

        if (!cupon || cupon.estado !== 'activo') {
            return res.status(404).json({ error: 'Cupón inválido o expirado' });
        }

        if (monto < cupon.montoMinimo) {
            return res.status(400).json({ error: `Monto mínimo: $${cupon.montoMinimo}` });
        }

        if (cupon.cantidadUsada >= cupon.cantidadTotal) {
            return res.status(400).json({ error: 'Cupón agotado' });
        }

        let descuento = 0;
        if (cupon.tipo === 'porcentaje') {
            descuento = (monto * cupon.valor) / 100;
        } else {
            descuento = cupon.valor;
        }

        res.json({ valido: true, descuento, cupon });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;