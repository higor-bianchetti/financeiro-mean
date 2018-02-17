(function() {
    angular.module('primeiroApp').controller('DashboardController', [
        '$http',
        DashboardController
    ])
    
    function DashboardController($http) {
        const self = this
        self.getSummary = function() {
            const url = 'http://localhost:3003/api/billingSummary'
    
            $http.get(url).then(function(response) {
                const {credit = 0, debt = 0} = response.data
                
                self.credit = credit
                self.debt = debt
                self.total = credit - debt
            })
        }
    
        self.getSummary()
    }
})()