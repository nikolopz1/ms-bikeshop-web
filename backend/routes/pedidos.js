const express = require('express');
const router = express.Router();
const { autenticacion } = require('../middleware/autenticacion');
const Pedido = require('../models/Pedido');

// Crear pedido
router.post('/', autenticacion, async (req, res) => {
    try {
        const { items, direccionEntrega, metodoPago } = req.body;

        const total = items.reduce((sum, item) => sum + item.subtotal, 0);
        
        const pedido = new Pedido({
            numeroPedido: 'PED-' + Date.now(),
            usuario: req.usuario._id,
            items,
            total,
            direccionEntrega,
            metodoPago
        });

        await pedido.save();
        res.status(201).json(pedido);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Obtener pedidos del usuario
router.get('/', autenticacion, async (req, res) => {
    try {
        const pedidos = await Pedido.find({ usuario: req.usuario._id }).populate('items.producto');
        res.json(pedidos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;