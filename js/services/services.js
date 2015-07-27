/**
 * Created by Liam on 27/07/2015.
 */
var fs = require("fs");
var path = require("path");
var jf = require('jsonfile');
var util = require('util');
//var url = require('url');
var slash = require('slash');

angular.module('myApp')
    .factory('MVideos', ['FileCheck', function (fileCheck) {

        var MVideos;
        try {

                    MVideos = fileCheck();
                    return MVideos;

        } catch (err) {
            console.error(err);
        }

    }])
    .factory('FileCheck', ['CONFIG', function (CONFIG) {



    }]);
