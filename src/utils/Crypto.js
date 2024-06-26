const cripto = require("crypto-js");
require("dotenv").config();

function decript(value) {
    const bytes = cripto.AES.decrypt(value, process.env.SECRET_KEY);
    return bytes.toString(cripto.enc.Utf8);
}

function encript(value) {
    return cripto.AES.encrypt(value, process.env.SECRET_KEY).toString();
}

function encriptJson(value) {
    return cripto.AES.encrypt(
        JSON.stringify(value),
        process.env.SECRET_KEY
    ).toString();
}

function decriptJson(value) {
    const bytes = cripto.AES.decrypt(value, process.env.SECRET_KEY);
    return JSON.parse(bytes.toString(cripto.enc.Utf8));
}

module.exports = {
    decript,
    encript,
    encriptJson,
    decriptJson,
};