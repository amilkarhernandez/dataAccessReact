const suscriptionRepository = require("../repositories/SuscripcionesRepository")
const Movimientos = require("../models/MovimientosSuscripciones")
const { Response } = require("../utils/Response");

async function getSuscription(req, res) {
    const id = req.params['id'];
    const resp = await suscriptionRepository.findUserSuscriptionUser(id);
    if (resp) {
        Response.status = 200;
        Response.message = "Registro Encontrado";
        Response.result = resp;
        res.status(200).send(
            Response
        );
    } else {
        Response.status = 404;
        Response.message = "No se Encontraron Resultados";
        res.status(404).send(
            Response
        );
    }
}

async function getMovimientosSuscription(req, res) {
    const idUser = req.params['idUser'];
    const resp = await suscriptionRepository.findMovimientosSuscriptionUser(idUser);
    if (resp) {
        Response.status = 200;
        Response.message = "Registro Encontrado";
        Response.result = resp;
        res.status(200).send(
            Response
        );
    } else {
        Response.status = 404;
        Response.message = "No se Encontraron Resultados";
        Response.result = [];
        res.status(404).send(
            Response
        );
    }
}

async function registerOperacion(req, res) {
    const movimientos = new Movimientos();
    const params = req.body;
    try {
        const valorTransfer = Number(params.valor);
        // Create Model
        movimientos.userId = params.userId;
        movimientos.suscriptionId = params.suscriptionId;

        // Save the user in database
        const movimientoResult = await suscriptionRepository.createMovimiento(movimientos);
        console.log("movimientoResult", movimientoResult)
        if (movimientoResult) {

            const movimiento = {
                valor: valorTransfer,
                operacion: params.operacion,
                emailOrigen: params.emailOrigen,
                emailDestino: params.emailDestino,
                fecha: new Date()
            }

            //Crea el Movimiento
            const respMov = await suscriptionRepository.AddMovimientoList(movimientoResult._id, movimiento);

            //descuenta o añade Saldo
            if (params.operacion == "Transferencia") {
                //Actualizacion de Saldo
                await suscriptionRepository.AddSaldo(movimientoResult.suscriptionId, valorTransfer);
            } else {
                await suscriptionRepository.RestarSaldo(movimientoResult.suscriptionId, valorTransfer);
            }

            Response.status = 201;
            Response.message = "Datos guardados correctamente en la base de datos";
            Response.result = movimientoResult;

            res.status(201).send(
                Response
            );
        }
    } catch (err) {
        console.log(err);
        Response.status = 500;
        Response.message = err.message;
        res.status(500).send(
            Response
        );
    }

}

module.exports = {
    getSuscription,
    getMovimientosSuscription,
    registerOperacion
}