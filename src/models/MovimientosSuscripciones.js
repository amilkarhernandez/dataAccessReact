const mongoose = require('mongoose');
const schema = mongoose.Schema;

const MovimientosSchema = schema({
    valor: {
        type: Number,
        required: true
    },
    operacion: {
        type: String,
        required: true
    },
    emailOrigen: {
        type: String,
        required: true
    },
    emailDestino: {
        type: String,
        required: true
    },
    fecha: {
        type: String,
        required: true
    },
    identificador: {
        type: String,
        required: true
    }
});

const MovSucripcionesSchema = schema({
    userId: { type: schema.ObjectId, ref: "usuario_collection" },
    suscriptionId: { type: schema.ObjectId, ref: "suscripciones_collection" },
    movimientos: [MovimientosSchema]
}, { timestamps: true });

module.exports = mongoose.model('movimientos_suscripciones_collection', MovSucripcionesSchema);