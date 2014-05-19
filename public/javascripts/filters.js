'use strict';

/* Filters */

var filters = angular.module('App.filters', [])
    

filters.filter('interpolate', ['version', 
    function(version) {
        return function(text) {
            return String(text).replace(/\%VERSION\%/mg, version);
        }
    }]);
