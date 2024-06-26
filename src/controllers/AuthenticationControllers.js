const { Response } = require("../utils/Response");
const usersRepsitory = require("../repositories/UsersRespository")
const JWT = require('../utils/JWT')
const bcrypt = require('bcrypt-nodejs')

async function loginUsuario(req, res) {
    const { username, password } = req.body;

    try {
        const findUsername = await usersRepsitory.findOneUserByUsername(username);
        if (findUsername) {
            bcrypt.compare(password, findUsername.password, async function (err, check) {
                if (err) {
                    console.log(err);
                    Response.status = 404;
                    Response.message = 'Username y/o contraseña Incorrecta';
                    res.status(404).send(
                        Response
                    );
                }
                if (check) {
                    //Genera el token
                    //Se elimina la data sencible
                    res.status(200).send({
                        token: "Bearer",
                        access_token: JWT.createToken(extractUserLogin(findUsername)),
                        user: extractUserLogin(findUsername)
                    });
                } else {
                    Response.status = 404;
                    Response.message = 'Username y/o contraseña Incorrecta';
                    Response.result = "";
                    res.status(404).send(
                        Response
                    );
                }
            })
        } else {
            Response.status = 404;
            Response.message = 'Username y/o contraseña Incorrecta';
            Response.result = "";
            res.status(404).send(
                Response
            );
        }
    }
    catch (err) {
        console.log(err);
        Response.status = 500;
        Response.message = err.message;
        res.status(500).send(
            Response
        );
    }
}

function extractUserLogin(user) {
    return {
        id: user._id,
        names: user.names,
        lastnames: user.lastnames,
        email: user.email
    }
}

module.exports = {
    loginUsuario
}