const SuscripcionModel = require("../models/Suscripciones");
const SuscripcionMovimientoModel = require("../models/MovimientosSuscripciones");

module.exports.createSuscripcion = async (suscription) => {
    try {
        return await suscription.save();
    } catch (err) {
        console.log(err)
        if (err.code === 11000) { // MongoDB error code for duplicate key
            throw new Error(`El userId ${suscription.userId} ya se encuentra en la Base de datos`);
        }
        throw new Error('Error al guardar los datos en la base de datos');
    }
};

module.exports.findUserSuscription = async (id) => {
    console.log("ID:", id)
    try {
        return await SuscripcionModel.findOne({ _id: id })
    } catch (err) {
        throw new Error('Ocurrio un error');
    }
};

module.exports.findUserSuscriptionUser = async (id) => {
    try {
        return await SuscripcionModel.findOne({ userId: id })
    } catch (err) {
        throw new Error('Ocurrio un error');
    }
};

module.exports.findMovimientosSuscriptionUser = async (idUser) => {
    try {
        return await SuscripcionMovimientoModel.findOne({ userId: idUser })
            .select('movimientos')
            .sort({ 'movimientos.fecha': 1 });
    } catch (err) {
        throw new Error('Ocurrio un error');
    }
};

module.exports.createMovimiento = async (movimiento) => {
    try {
        const respExist = await SuscripcionMovimientoModel.findOne({ userId: movimiento.userId });
        if (respExist == null) {
            return await movimiento.save();
        }
        return respExist;
    } catch (err) {
        console.log(err)
        throw new Error('Error al guardar los datos en la base de datos');
    }
};

module.exports.AddMovimientoList = async (id, objeto) => {
    try {
        return await SuscripcionMovimientoModel.findByIdAndUpdate({ _id: id }, {
            $push: {
                movimientos: objeto
            },
        })
    } catch (err) {
        throw new Error('Ocurrio un error');
    }
};

module.exports.AddSaldo = async (id, saldoNew) => {
    try {
        const suscripcion = await SuscripcionModel.findOne({ _id: id })
        console.log(suscripcion.valorTotal)
        console.log(saldoNew)
        const nuevoSaldo = suscripcion.valorTotal + saldoNew;
        return await SuscripcionModel.findByIdAndUpdate(id, {
            valorTotal: nuevoSaldo
        }, { new: true });
    } catch (err) {
        console.log(err)
        throw new Error('Ocurrio un error');
    }
};

module.exports.RestarSaldo = async (id, saldoNew) => {
    try {
        const suscripcion = await SuscripcionModel.findOne({ _id: id })
        console.log(suscripcion.valorTotal)
        console.log(saldoNew)
        const nuevoSaldo = suscripcion.valorTotal - saldoNew;
        return await SuscripcionModel.findByIdAndUpdate(id, {
            valorTotal: nuevoSaldo
        }, { new: true });
    } catch (err) {
        console.log(err)
        throw new Error('Ocurrio un error');
    }
};