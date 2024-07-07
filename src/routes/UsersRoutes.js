const express = require('express');
const usersController = require('../controllers/UsersController');

const api = express.Router();

api.post('/users/create', usersController.registerUsers);
api.get('/users/list', usersController.listUsers);
api.patch('/users/update/:id', usersController.actualizar);
api.patch('/users/updatePassword/:id', usersController.updatePassword);
api.delete('/users/delete/:id', usersController.daleteUser);

module.exports = api;