/* All paths relative to Root, NOT Services Folder */

angular.module('myApp').factory('InitializeVideos', [function() {
    var CONFIG = require("config.js");
    var GetFiles = require("modules/GetFiles.js");

    //Get the Video Files, filter by the extensions from the CONFIG file.
    videos = getFilesArray(CONFIG.folders.videoRoot, CONFIG.extensions.videos);

    var model = Array();

    for (var v in videos) {
        model.push(
            {
                name: path.basename(videos[v], path.extname(videos[v])),
                filename: path.basename(videos[v]),
                folder: path.dirname(videos[v]),
                path: videos[v]
            });
    }


    return {
        videos: model,
        length: model.length
    };

}])
    .factory('Database', [function(){
        //Angular wrapper for the Database Node Module
        return require('modules/Database.js');
    }])

.factory('Startup', ['Database', function(Database){
        var CONFIG = require("config");
        var fs = require("fs");
        var path = require("path");
        var jf = require('jsonfile');
        var util = require('util');
        var url = require('url');
        var slash = require('slash');



        jf.spaces = '\t';



        if(fs.existsSync(CONFIG.compicsDataFile)) {

        } else {
            console.log("Compic Metadata file not found, creating...");

            var filesys = require("filesystem");
            var compicFiles = filesys.getFilesArray(CONFIG.folders.compicsRoot, CONFIG.extensions.compics);

            for(pic in compicFiles) {

            }

        }
    }]);