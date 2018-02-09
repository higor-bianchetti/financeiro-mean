const port = 3003

const bodyParser = require('body-parser')
const express = require('express')

const server = express()

/* Middlewares responsáveis por realizarem o parser dos dados, tanto das submissões de formulários, quanto de objetos JSON. */
server.use(bodyParser.urlencoded({extended: true}))
server.use(bodyParser.json())

server.listen(port, function() {
    console.log(`BACKEND is running on port ${port}.`)  
})

module.exports = server