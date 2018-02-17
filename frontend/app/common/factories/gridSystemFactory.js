angular.module('primeiroApp').factory('gridSystem', [function() {
    function toCssClasses(numbers) {
        const cols = numbers ? numbers.split(' ') : []
        let classes = ''

        if(cols[0]) classes += `col-xs-${cols[0]}`
        if(cols[1]) classes += ` col-sm-${cols[1]}`
        if(cols[2]) classes += ` col-md-${cols[1]}`
        if(cols[3]) classes += ` col-lg-${cols[1]}`

        return classes
    }

    // Toda Factory deve retornar um objeto.
    return {toCssClasses}
}])