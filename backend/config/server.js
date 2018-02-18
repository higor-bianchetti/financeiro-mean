const port = 3003

const bodyParser = require('body-parser')
const express = require('express')
const allowCors = require('./cors')
const queryParser = require('express-query-int')

const server = express()

/* Middlewares responsáveis por realizarem o parser dos dados, tanto das submissões de formulários, quanto de objetos JSON. */
server.use(bodyParser.urlencoded({extended: true}))
server.use(bodyParser.json())

/* Middleware responsável por permitir a aplicação ser acessada por outra. */
server.use(allowCors)

/* Middleware responsável por realizar o parser de valores string para inteiros nas urls. */
server.use(queryParser())

server.listen(port, function() {
    console.log(`BACKEND is running on port ${port}.`)  
})

module.exports = server