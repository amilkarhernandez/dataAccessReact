const UsuarioModel = require("../models/Users");

module.exports.createUser = async (user) => {
    try {
        return await user.save();
    } catch (err) {
        console.log(err)
        if (err.code === 11000) { // MongoDB error code for duplicate key
            throw new Error(`El correo ${user.email} ya se encuentra en la Base de datos`);
        }
        throw new Error('Error al guardar los datos en la base de datos');
    }
};

module.exports.findOneUserByUsername = async (username) => {
    try {
        return await UsuarioModel.findOne({ username: username, status: true })
    } catch (err) {
        throw new Error('Username y/o contraseña Incorrecta');
    }
};

module.exports.findAllUsers = async () => {
    try {
        return await UsuarioModel.find({});
    } catch (err) {
        throw new Error('OCurrio un error al Obtener los datos');
    }
};

module.exports.updateUsuario = async (id, query) => {
    try {
        return await UsuarioModel.findByIdAndUpdate({ _id: id }, query);
    } catch (err) {
        console.log(err)
        throw new Error('Error al Actualizar los datos en la base de datos');
    }
};

module.exports.deleteUsuario = async (id) => {
    try {
        return await UsuarioModel.findByIdAndDelete({ _id: id });
    } catch (err) {
        console.log(err)
        throw new Error('Error al Eiminar los datos en la base de datos');
    }
};