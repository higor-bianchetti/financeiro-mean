(function() {
    angular.module('primeiroApp').component('field', {
        bindings: {
            id: '@',
            label: '@',
            grid: '@',
            placeholder: '@',
            type: '@',
            model: '=',
            readonly: '<'
        },
        controller: [
            'gridSystem',
            function (gridSystem) {
                this.$onInit = function() {
                    this.gridClasses = gridSystem.toCssClasses(this.grid)
                }
            }
        ],
        template: `
            <div class="{{$ctrl.gridClasses}}">
                <div class="form-group">
                    <label for="{{$ctrl.id}}">{{$ctrl.label}}</label>
                    <input type="{{$ctrl.type}}" id="{{$ctrl.id}}" class="form-control" placeholder="{{$ctrl.placeholder}}" ng-model="$ctrl.model" ng-readonly="$ctrl.readonly" />
                </div>
            </div>
        `
    })
})()