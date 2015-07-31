/**
 * Created by Liam on 27/07/2015.
 */

angular.module('myApp')
    .factory('ChangeFileExt', ['$log', 'GetExcept', 'lodash', function ($log, excepts) {


        return function(file, obj) {
            var path = require("path");
            var err = excepts("ParameterError");

            if(!obj.hasOwnProperty('from') || !obj.hasOwnProperty('to')) throw err;


            var muted = path.join(
                path.dirname(file),
                path.basename(file, obj.from) + obj.to
            );

            return muted;
        }

    }]).factory('GetExcept', ['lodash', 'Excepts', function(lodash, excepts) {
        return function(name) {
            lodash.find(excepts, function(obj) {
                obj.name = name;
            });
        }
    }])

    .factory('SaveData', [function(){
        var dataManager = global.exports.dataManager;
        var CONFIG = global.exports.config;

        return function(newVal, oldVal) {

            //Make sure the object is valid
            if(typeof(newVal) !== 'object') {
                console.error()
            }

            dataManager.save(newVal, CONFIG.videoDataFile);
        }

    }])



    .constant('Excepts', [
        {
            name: 'ParameterError',
            message: "2nd paramter must be an object with the following keys: {from: string, to: string, flag: string}."
        }
    ]

    );
