const mongoose = require('mongoose'),
        Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const secret = require('../config').secret;

const UsuarioSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: [true, "não pode ficar vazio!"]
    },
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: [true, "não pode ficar vazio!"],
        index: true,
        match: [/\S+@\S+\.\S+/, 'É invalido.']
    },
    loja: {
        type: Schema.Types.ObjectId,
        ref: "Loja",
        required: [true, "não pode ficar vazia!"]
    },
    permissao: {
        type: Array,
        default: ["client"]
    },
    hash: String,
    salt: String,
    recovery: {
        type: {
            token: String,
            date: Date
        },
        default: {}
    }
}, { timestamps: true });

UsuarioSchema.plugin(uniqueValidator, { message: "Já está sendo utilizado" });

// Setar a senha
UsuarioSchema.methods.setSenha = function(password) {
    this.salt = crypto.randomBytes(16).toString("hex");
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000,512, "sha512").toString("hex");
};

// Validação de senha
UsuarioSchema.methods.validarSenha = function(password) {
    const hash = crypto.pbkdf2Sync(password, this.salt, 10000,512, "sha512").toString("hex");
    return hash === this.hash;
};

// Função que gera o token
UsuarioSchema.methods.gerarToken = function() {
    const hoje = new Date();
    const exp = new Date(hoje);
    exp.setDate(hoje.getDate() + 15);

    return jwt.sign({
        id: this._id,
        email: this.email,
        nome: this.nome,
        exp: parseFloat(exp.getTime() / 1000, 10)
    }, secret);
};

UsuarioSchema.methods.enviarAuthJSON= function() {
    return {
        _id: this._id,
        nome: this.nome,
        email: this.email,
        loja: this.loja,
        role: this.permissao,
        token: this.gerarToken()
    };
};

// Recuperar senha
UsuarioSchema.methods.criarTokenRecuperacaoSenha = function() {
    this.recovery = {};
    this.recovery.token = crypto.randomBytes(16).toString("hex");
    this.recovery.date = new Date( new Date().getTime() + 24*60*60*1000) // TOKEN VALE POR UM DIA
    return this.recovery;
};

// Finaliza o token/limpa tudo
UsuarioSchema.methods.finalizarTokenRecuperacaoSenha = function() {
    this.recovery = { token: null, date: null };
    return this.recovery;
};

module.exports = mongoose.model("Usuario", UsuarioSchema);