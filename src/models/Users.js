const mongoose = require('mongoose');
const schema = mongoose.Schema;

const UsuariosSchema = schema({
    names: {
        type: String,
        required: true
    },
    lastnames: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        required: false
    }
}, { timestamps: true });

module.exports = mongoose.model('usuario_collection', UsuariosSchema);