const mongoose = require('mongoose');
const schema = mongoose.Schema;

const SucripcionesSchema = schema({
    userId: { type: schema.ObjectId, ref: "usuario_collection", unique: true },
    valorTotal: {
        type: Number,
        required: true
    },
}, { timestamps: true });

module.exports = mongoose.model('suscripciones_collection', SucripcionesSchema);