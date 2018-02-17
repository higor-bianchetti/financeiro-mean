angular.module('primeiroApp').component('contentHeader', {
    bindings: {
        title: '@',
        subtitle: '@',
    },
    template: `
        <section class="content-header">
	        <h1>{{$ctrl.title}} <small>{{$ctrl.subtitle}}</small></h1>
        </section>
    `
})