/* All paths relative to Root, NOT Services Folder */

angular.module('myApp').factory('GetVideoCollection', [function(CONFIG) {
    var GetFiles = require("modules/GetFiles.js");

    //Get the Video Files, filter by the extensions from the CONFIG file.
    videos = GetFiles.getFilesArray(CONFIG.folders.videoRoot, CONFIG.extensions.videos);

    return require('modules/VideosCollection.js')(videos);

}])
    .factory('Database', [function(){
        //Angular wrapper for the Database Node Module
        return require('modules/Database.js');
    }])

.factory('Startup', ['Database', 'GetVideoCollection', function(Database, GetVids){
        var CONFIG = require("config.js");
        var fs = require("fs");
        var url = require('url');
        var slash = require('slash');

        var vidModel = GetVids(CONFIG);


        var parser = require('modules/VideoParser.js');
        parser.parse(CONFIG.folders.videoRoot);




        if(fs.existsSync(CONFIG.compicsDataFile)) {

        } else {
            console.log("Compic Metadata file not found, creating...");

            var filesys = require("filesystem");
            var compicFiles = filesys.getFilesArray(CONFIG.folders.compicsRoot, CONFIG.extensions.compics);

            for(pic in compicFiles) {

            }

        }
    }]);