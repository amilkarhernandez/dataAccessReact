const bcrypt = require("bcrypt-nodejs")

const Users = require("../models/Users");
const userRepository = require("../repositories/UsersRespository")
const { Response } = require("../utils/Response");

async function registerUsers(req, res) {
    const user = new Users();
    const params = req.body;

    try {
        // encript password
        bcrypt.hash(params.password, null, null, async function (err, hash) {
            if (hash) {
                user.password = hash;
            }
        });

        // Create Model
        user.names = params.names;
        user.lastnames = params.lastnames;
        user.email = params.email;
        user.username = params.username;
        user.status = true;

        // Save the user in database
        const resp = await userRepository.createUser(user);
        if (resp) {
            Response.status = 201;
            Response.message = "Datos guardados correctamente en la base de datos";
            Response.result = resp;
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

async function listUsers(req, res) {
    const resp = await userRepository.findAllUsers();
    if (resp.length > 0) {
        Response.status = 200;
        Response.message = "Registros Encontrados";
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

async function actualizar(req, res) {
    const id = req.params['id'];

    const { names, lastnames, username, password, status } = req.body;

    let encripPass = "";
    // encript password
    await bcrypt.hash(password, null, null, async function (err, hash) {
        if (hash) {
            encripPass = hash;
        }
    });

    const query = {
        names: names,
        lastnames: lastnames,
        username: username,
        password: encripPass,
        status: status
    };

    try {
        const resp = await userRepository.updateUsuario(id, query);
        if (resp) {
            Response.status = 200;
            Response.message = "Registros Actualizados";
            Response.result = resp;
            res.status(200).send(
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

async function updatePassword(req, res) {
    const id = req.params['id'];

    const { password } = req.body;

    try {
        let query = {
            password: password,
            firstPass: "FALSE"
        }

        await bcrypt.hash(password, null, null, async function (err, hash) {
            if (hash) {
                query.password = hash;
            }
        });

        const result = await userRepository.updateUsuario(id, query);
        Response.status = 200;
        Response.message = "Success Data Fetch";
        res.status(200).send(
            Response
        );
    } catch (err) {
        console.log(err);
        Response.status = 500;
        Response.message = err.message;
        res.status(500).send(
            Response
        );
    }

}

async function daleteUser(req, res) {
    const id = req.params['id'];

    try {

        await userRepository.deleteUsuario(id);
        Response.status = 200;
        Response.message = "Se ha Eliminado el Usuario";
        res.status(200).send(
            Response
        );
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
    registerUsers,
    listUsers,
    actualizar,
    updatePassword,
    daleteUser
}