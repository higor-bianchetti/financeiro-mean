const BillingCycle = require('./billingCycle')

/* Cria uma API rest para os métodos get, post, put e delete. */
BillingCycle.methods(['get', 'post', 'put', 'delete'])

/* Em uma requisição PUT, o padrão da API retorna o objeto antigo depois de realizar a atualização.
Para que a API retorne o objeto atual depois do update é necessário passar o valor new como true. 
OBS: Por padrão, a API também não checa as validações em requisições PUT. Para que as requisições PUT também sejam validadas é preciso passar o valor runValidators: true. */
BillingCycle.updateOptions({new: true, runValidators: true})

/* Criando uma rota que retorna a quantidade de objetos que estão no banco. */
BillingCycle.route('count', function(req, res, next) {
    BillingCycle.count(function(error, value) {
        if(error) {
            res.status(500).json({errors: [error]})
        } else {
            res.json({value})
        }
    })
})

module.exports = BillingCycle