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
                self.billingCycle = {}
                self.billingCycles = response.data
                tabs.show(self, {tabList: true, tabCreate: true})
            })
        }

        self.refresh()
    }
})()