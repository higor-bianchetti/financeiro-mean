(function() {
    angular.module('primeiroApp').controller('BillingCycleController', [
        '$http',
        'msgs',
        'tabs',
        BillingCycleController
    ])

    function BillingCycleController($http, msgs, tabs) {
        const self = this
        const url = 'http://localhost:3003/api/billingCycles'

        self.refresh = function() {
            $http.get(url).then(function(response) {
                self.billingCycle = {credits: [{}], debts: [{}]}
                self.billingCycles = response.data
                tabs.show(self, {tabList: true, tabCreate: true})
            })
        }

        self.showTabUpdate = function(billingCycle) {
            self.billingCycle = billingCycle
            tabs.show(self, {tabUpdate: true})
        }

        self.showTabDelete = function(billingCycle) {
            self.billingCycle = billingCycle
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
        }

        self.deleteCredit = function(index) {
            if(self.billingCycle.credits.length > 1) {
                self.billingCycle.credits.splice(index, 1)
            }
        }

        self.addDebt = function(index) {
            self.billingCycle.debts.splice(index + 1, 0, {})
        }

        self.cloneDebt = function(index, {name, value, status}) {
            self.billingCycle.debts.splice(index + 1, 0, {name, value, status})
        }

        self.deleteDebt = function(index) {
            if(self.billingCycle.debts.length > 1) {
                self.billingCycle.debts.splice(index, 1)
            }
        }

        self.refresh()
    }
})()