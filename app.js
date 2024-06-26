const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const swaggerUi = require("swagger-ui-express")
const swaggerDocument = require("./swagger-output.json")
require("dotenv").config();

const app = express();

//Datos codifcados en URL
app.use(bodyParser.urlencoded({ extended: true }));

//Analiza objeto Json
app.use(bodyParser.json());

app.use(
    cors({
        origin: "*",
    })
);

//Conexion a base de datos
const MONGODB_URI = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}/${process.env.MONGO_DB}?retryWrites=true&authSource=admin`;

//useUnifiedTopology: true, useNewUrlParser: true, DEPRECADO
mongoose
    .connect(MONGODB_URI)
    .then(() => {
        console.log("Base de Datos Conectada");
    })
    .catch((err) => {
        console.log(err);
        throw err;
    });

app.get("/status", (req, res) => {
    res.status(200).send({
        success: "true",
        message: "Servidor Corriendo",
    });
});

const auth_routes = require('./src/routes/AuthenticationRoutes');
const user_routes = require('./src/routes/UsersRoutes');

//use las Rutas
app.use('/api', auth_routes);
app.use('/api', user_routes);

//Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//Export
module.exports = app;