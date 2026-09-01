const express = require('express');
const router = express.Router();
const { autenticacion, esAdmin } = require('../middleware/autenticacion');
const Producto = require('../models/Producto');
const Pedido = require('../models/Pedido');

// Crear producto (solo admin)
router.post('/productos', autenticacion, esAdmin, async (req, res) => {
    try {
        const producto = new Producto(req.body);
        await producto.save();
        res.status(201).json(producto);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Actualizar producto (solo admin)
router.put('/productos/:id', autenticacion, esAdmin, async (req, res) => {
    try {
        const producto = await Producto.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(producto);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Obtener estadísticas
router.get('/estadisticas', autenticacion, esAdmin, async (req, res) => {
    try {
        const totalPedidos = await Pedido.countDocuments();
        const totalVentas = await Pedido.aggregate([{ $group: { _id: null, total: { $sum: '$total' } } }]);
        res.json({ totalPedidos, totalVentas: totalVentas[0]?.total || 0 });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;