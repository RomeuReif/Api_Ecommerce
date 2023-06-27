// Pacotes
const compression = require("compression");
const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");

// Iniciar
const app = express();

// Ambiente
const isProduction = process.env.NODE_ENV === "production";
const PORT = process.env.PORT || 3000;

// Arquivos estaticos
app.use("/public", express.static(__dirname + "/public"));
app.use("/public/imgs", express.static(__dirname + "/public/imgs"));

// Setup mongoDB
const dbs = require("./config/database");
const dbsURI = isProduction ? dbs.dbProduction : dbs.dbTest;
mongoose.connect(dbsURI, { useNewUrlParser: true});

// Setup pacote de view ejs
app.set("view engine", "ejs");

// Configuraçoes
if(!isProduction) app.use(morgan("dev"));
app.use(cors());
app.disable('x-powered-by');
app.use(compression());

// Setup Body Parser
app.use(bodyParser.urlencoded({ extended: false, limit: 1.5*1024*1024}));
app.use(bodyParser.json({ limit: 1.5*1024*1024 }));

// Models
require("./models");

// Rotas
app.use("/", require("./routes"));

// Rota 404 Erro
app.use((req, res, next) => {
    const err = new Error("Not Found");
    err.status = 404;
    next(err);
});

// Rotas - 422, 500, 401
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    if(err.status !== 404) console.warn("Error: ", err.message, new Date());
    res.json({  errors: { message: err.message, status: err.status }});
});

// Escutar na porta
app.listen(PORT, (err) => {
    if(err) throw err;
    console.log(`Rodando na //localhost:${PORT}`);
});