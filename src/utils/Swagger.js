const swaggerAutogen = require("swagger-autogen");

const doc = {
    info: {
        title: 'Unac Insight',
        description: 'Modulo de Calificaciones'
    },
    // host: "37.60.252.97:3000",
    host: "localhost:3000",
    shemes: ['http']
};

const outputFile = '../../swagger-output.json'
const endpointsFile = ['../../app.js']

swaggerAutogen(outputFile, endpointsFile, doc)
    .then(() => {
        require('../../index.js');
    })