angular.module('myApp').factory('Common', function() {
    return {
        /**
         * Transmute a Javascript Arguments Object,
         * @desc Prefers options objects to straight values, Check if Args objects length is less than the valueLength, if so, its an options obj return as is, if there are multiple values return an array of values
         * @param {Array} args | The JS Arguments object to be transmuted
         * @param {int} valueLength | The length of the args if the function was called with separate args eg. myFunc(arg1, arg2, arg3) as opposed to something like myFunc({arg1: val, arg2: val2})
         */
        parseArgs: function(args, valueLength)
        {

        }
    }
});
