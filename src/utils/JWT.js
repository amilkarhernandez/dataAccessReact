const jwt = require('jwt-simple');
const moment = require('moment');
const cryptoJs = require("../utils/Crypto")
require('dotenv').config()

exports.createToken = function (user) {
    const payload = {
        sub: user._id,
        names: user.name,
        lastnames: user.lastname,
        email: user.email,
        semestre: user.semestre,
        signatures: user.signatureId,
        role: cryptoJs.encript(user.role),
        firstPass: user.firstPass,
        iat: moment().unix(),
        exp: moment().add(process.env.ACCESS_TOKEN_EXPIRE_MINUTES, 'days').unix(),
    }
    return jwt.encode(payload, process.env.SECRET_KEY, process.env.ALGORITHM);
}

exports.encript = function (field) {
    return jwt.encode(field, process.env.SECRET_KEY, process.env.ALGORITHM);
}

exports.verifyToken = function (token) {
    return jwt.decode(token, process.env.SECRET_KEY, process.env.ALGORITHM);
}