var _ = require('lodash');
var tango = require('./tango.json');
tango2 = _(tango).map(function(a) {return a[0];}).value();
console.log(
    _(tango2)
        .groupBy(function(a) {return a;})
        .mapValues(function(value) {return value.length})
        .pick(function(value, key) {return value > 1;}).value());
