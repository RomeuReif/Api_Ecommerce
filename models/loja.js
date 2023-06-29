const mongoose = require('mongoose');

const LojaSchema = mongoose.Schema({
    nome: { type: String, required: true },
    cnpj: { type: Number, required: true, unique: true },
    email: { type: String },
    telefones: {
        type: [{ type: String }]
    },
    endereco: {
        type: {
            local: { type: String, required: true },
            numero: { type: String, required: true },
            complemento: { type: String },
            bairro: { type: String, required: true },
            cidade: { type: String, required: true },
            CEP: { type: String, required: true },
        },
        required: true
    }
}, { timestamps: true });

module.exports = LojaSchema