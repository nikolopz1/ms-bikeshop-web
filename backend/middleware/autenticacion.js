const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

const autenticacion = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        
        if (!token) {
            return res.status(401).json({ error: 'Token no proporcionado' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.usuario = await Usuario.findById(decoded.id);
        
        if (!req.usuario) {
            return res.status(401).json({ error: 'Usuario no encontrado' });
        }

        next();
    } catch (error) {
        res.status(401).json({ error: 'Token inválido' });
    }
};

const esAdmin = (req, res, next) => {
    if (req.usuario.rol !== 'admin') {
        return res.status(403).json({ error: 'No tienes permisos de administrador' });
    }
    next();
};

module.exports = { autenticacion, esAdmin };