require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();

// ===== MIDDLEWARE =====
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ===== CONEXIÓN A BASE DE DATOS =====
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ms-bikeshop', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('✅ Conectado a MongoDB'))
.catch(err => console.error('❌ Error de conexión:', err));

// ===== RUTAS =====
app.use('/api/auth', require('./routes/auth'));
app.use('/api/productos', require('./routes/productos'));
app.use('/api/pedidos', require('./routes/pedidos'));
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/pagos', require('./routes/pagos'));
app.use('/api/cupones', require('./routes/cupones'));
app.use('/api/resenas', require('./routes/resenas'));
app.use('/api/envios', require('./routes/envios'));

// ===== RUTA PRINCIPAL =====
app.get('/', (req, res) => {
    res.json({
        mensaje: '🚲 Bienvenido a MS BikeShop API',
        version: '1.0.0',
        endpoints: {
            auth: '/api/auth',
            productos: '/api/productos',
            pedidos: '/api/pedidos',
            usuarios: '/api/usuarios',
            admin: '/api/admin',
            pagos: '/api/pagos',
            cupones: '/api/cupones',
            resenas: '/api/resenas',
            envios: '/api/envios'
        }
    });
});

// ===== MANEJO DE ERRORES =====
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: 'Error del servidor',
        mensaje: err.message
    });
});

// ===== INICIAR SERVIDOR =====
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor ejecutándose en puerto ${PORT}`);
    console.log(`📍 http://localhost:${PORT}`);
});

module.exports = app;
