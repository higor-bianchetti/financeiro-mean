const mongoose = require('mongoose')

module.exports = mongoose.connect('mongodb://localhost/db_financeiro');

/* Altera as mensagens de erros. */
mongoose.Error.messages.general.required = "O Atributo '{PATH}' é obrigatório"
mongoose.Error.messages.Number.min = "O '{PATH}' informado ('{VALUE}') é menor que o limite mínimo de '{MIN}'"
mongoose.Error.messages.Number.max = "O '{PATH}' informado ('{VALUE}') é maior que o limite máximo de '{MAX}'"
mongoose.Error.messages.String.enum = "'{VALUE}' não é válido para o atributo '{PATH}'"