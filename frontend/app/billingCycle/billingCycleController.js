(function() {
    angular.module('primeiroApp').controller('BillingCycleController', [
        '$http',
        '$location',
        'msgs',
        'tabs',
        BillingCycleController
    ])

    function BillingCycleController($http, $location, msgs, tabs) {
        const self = this
        const url = 'http://localhost:3003/api/billingCycles'

        self.refresh = function() {
            const page = parseInt($location.search().page) || 1

            $http.get(`${url}?skip=${(page - 1) * 10}&limit=10`).then(function(response) {
                self.billingCycle = {credits: [{}], debts: [{}]}
                self.billingCycles = response.data
                self.calculateValues()
                
                /* Obtendo a quantidade de páginas que é preciso para mostrar todos os registros salvos no banco. */
                $http.get(`${url}/count`).then(function(response) {
                    self.pages = Math.ceil(response.data.value / 10)
                    tabs.show(self, {tabList: true, tabCreate: true})
                })
            })
        }

        self.showTabUpdate = function(billingCycle) {
            self.billingCycle = billingCycle
            self.calculateValues()
            tabs.show(self, {tabUpdate: true})
        }

        self.showTabDelete = function(billingCycle) {
            self.billingCycle = billingCycle
            self.calculateValues()
            tabs.show(self, {tabDelete: true})
        }

        self.create = function() {
            $http.post(url, self.billingCycle).then(function(response) {
                self.refresh()
                msgs.addSuccess('Operação Realizada com Sucesso!')
            }, function(response) {
                msgs.addError(response.data.errors)
            })
        }

        self.update = function() {
            const updateUrl = `${url}/${self.billingCycle._id}`

            $http.put(updateUrl, self.billingCycle).then(function(response) {
                self.refresh()
                msgs.addSuccess('Operação relizada com sucesso!')
            }, function(response) {
                msgs.addError(response.data.errors)
            })
        }

        self.delete = function() {
            const deleteUrl = `${url}/${self.billingCycle._id}`

            $http.delete(deleteUrl, self.billingCycle).then(function(response) {
                self.refresh()
                msgs.addSuccess('Operação relizada com sucesso!')
            }, function(response) {
                msgs.addError(response.data.errors)
            })
        }

        self.addCredit = function(index) {
            self.billingCycle.credits.splice(index + 1, 0, {})
        }

        self.cloneCredit = function(index, {name, value}) {
            self.billingCycle.credits.splice(index + 1, 0, {name, value})
            self.calculateValues()
        }

        self.deleteCredit = function(index) {
            if(self.billingCycle.credits.length > 1) {
                self.billingCycle.credits.splice(index, 1)
                self.calculateValues()
            }
        }

        self.addDebt = function(index) {
            self.billingCycle.debts.splice(index + 1, 0, {})
        }

        self.cloneDebt = function(index, {name, value, status}) {
            self.billingCycle.debts.splice(index + 1, 0, {name, value, status})
            self.calculateValues()
        }

        self.deleteDebt = function(index) {
            if(self.billingCycle.debts.length > 1) {
                self.billingCycle.debts.splice(index, 1)
                self.calculateValues()
            }
        }

        self.calculateValues = function() {
            self.credit = 0
            self.debt = 0

            if(self.billingCycle) {
                self.billingCycle.credits.forEach(function({value}) {
                    self.credit += !value || isNaN(value) ? 0 : parseFloat(value)
                });

                self.billingCycle.debts.forEach(function({value}) {
                    self.debt += !value || isNaN(value) ? 0 : parseFloat(value)
                });
            }

            self.total = self.credit - self.debt
        }

        self.refresh()
    }
})()