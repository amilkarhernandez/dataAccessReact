const express = require('express');
const authController = require('../controllers/AuthenticationControllers');

const api = express.Router();

api.post('/users/login', authController.loginUsuario);

module.exports = api;