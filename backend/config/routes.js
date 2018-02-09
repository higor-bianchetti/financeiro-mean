const express = require('express')

module.exports = function(server) {
    // API de rotas
    const router = express.Router()

    server.use('/api', router)

    const billingCycleService = require('../api/billingCycle/billingCycleService')
    billingCycleService.register(router, '/billingCycles')
}