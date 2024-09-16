const express = require('express');
const suscriptionControllers = require('../controllers/SuscriptionControllers');

const api = express.Router();

api.get('/suscriptions/find/:id', suscriptionControllers.getSuscription);
api.get('/suscriptions/movimientos/:idUser', suscriptionControllers.getMovimientosSuscription);
api.post('/suscriptions/movimiento', suscriptionControllers.registerOperacion);

module.exports = api;