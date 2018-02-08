const BillingCycle = require('./billingCycle')

/* Cria uma API rest para os métodos get, post, put e delete. */
BillingCycle.methods(['get', 'post', 'put', 'delete'])

module.exports = BillingCycle