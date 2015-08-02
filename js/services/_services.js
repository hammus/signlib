/**
 * @ngdoc service
 * @name LocalDataService
 * @description
 *  Handles storing and retrieving data from localStorage
 */
(function() {
    "use strict";
    function getLocalData(localStore) {
        return function (options) {
            //Check name
            if(options !== Object(options)) {
                console.error("This function only accepts a single parameter as an options object.");
                return false;
            }
            var name = options.name;

            if (typeof localStore.get(name) !== 'undefined') {
                if (typeof JSON.parse(localStore.get(name)) === 'object') {
                    return JSON.parse(localStore.get(name));
                }
                console.error("Local storage object was found but is not a valid JSON object.");
                console.log(JSON.parse(localStore.get(name)));
                console.log(localStore.get(name));
                return false;
            }

            console.error("Local storage object " + name + " does not exist");
            return false;


        }
    }

    function setLocalData(localStore)
    {
        return function(options){

            //Check name
            if(options !== Object(options)) {
                console.error("This function only accepts a single parameter as an options object.");
                return false;
            }

            /* The key to use on the localStorage object */
            var name = options.name;
            var data = options.data;
            //Store in localStorage
            try {
                localStore.set(name, JSON.stringify(data));
                return true;
            } catch(e)
            {
                console.log("Error saving to localStorage. " + e.message);
                console.log(obj);
                console.log(data);
                return false;
            }


        }
    }

    function onLoad()
    {
        if(global.exports.config.isFirstLoad)
        {
            setLocalData("videos", global.exports.data.videos);
            setLocalData("compics", global.exports.data.compics);
        }

        return {
            videos: getLocalData("videos"),
            compics: getLocalData("compics")
        };

    }

    var LocalDataService = function(localStore){
        return {
            onLoad: onLoad,
            saveData: function(options)
            {
                return setLocalData(options);
            },
            loadData: function(options)
            {
                return getLocalData(options);
            }

        }
    };

    LocalDataService.$inject('LocalStorageModule');
    angular.module('myApp')
        .factory('LocalDataService', LocalDataService);
})();

